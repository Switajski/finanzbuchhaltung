(ns de.switajski.fibu.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [ring.middleware.params :as params-middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            [de.switajski.writer :refer :all]
            [de.switajski.ednreader :as edn]
            [clojure.java.io :as jio]
            [clojure.data.json :as json]
            [ring.util.io :as ring-io])
  (:import [java.io BufferedInputStream FileInputStream]
           (java.math RoundingMode)))

(def BUFFER-SIZE 8192)
(def buchen-file "buchen.dbf")
(defn number-format [n] (.doubleValue (.setScale (java.math.BigDecimal. n) 2 RoundingMode/HALF_UP)))

(defn to-json [r]
  {:pos           (:rech_nr r)
   :debitAccount  (:konto r)
   :creditAccount (:gegen r)
   :sum           (:betrag_s r)
   :text          (:btext r)
   :date          (:dat r)
   :accountedDate (:bdatum r)
   :tax           (:vmsteuer r)
   :datensatz     (:datensatz r)})

(defn stream!
  [in-file & {:keys [transform reader]
              :or   {transform #(when true %)
                     reader    dbf/read-records!}}]
  (ring-io/piped-input-stream
    #(let [writer (jio/make-writer % {})
           dbf-meta (dbf/read-dbf-meta in-file)
           dbf (jio/input-stream (jio/resource in-file) :buffer-size BUFFER-SIZE)]
       (.write writer "[{}")
       (doseq [rec (reader dbf dbf-meta {})]
         (when (not (:deleted rec))
           (.write writer ",")
           (json/write (transform rec) writer)))
       (.write writer "]")
       (.flush writer))))


(defn records-of [in-file]
  (let [dbf-meta (dbf/read-dbf-meta in-file)
        dbf (jio/input-stream (jio/resource in-file) :buffer-size BUFFER-SIZE)]
    (dbf/read-records! dbf dbf-meta {})))

(defroutes app-routes
           (GET "/accounting-records" []
             {:status 200
              :body   (stream! buchen-file
                               :reader dbf/read-accounting-records!
                               :transform to-json)})
           (GET "/accounting-records-without-stream" []
             {:status 200
              :body   (map #(first %)
                           (partition-by :rech_nr (records-of buchen-file)))})
           (GET "/balance" request
             (let [accountNo (get-in request [:params :accountNo])]
               {:status 200
                :body   {:sum
                         (number-format
                           (reduce #(if (= accountNo (:konto %2))
                                      (+ %1 (:betrag_h %2))
                                      %1)
                                   0
                                   (records-of buchen-file)))}}))
           (GET "/account-plan" []
             {:status 200
              :body   (stream! "konten2.dbf")})
           (GET "/taxes" []
             {:status 200
              :body   (edn/read "taxes.edn")})              ;TODO: fa08.dbf instead of config file
           (POST "/create-record" json
             (doseq [record (to-list-of-values
                              (generate-accounting-records
                                (:body json)
                                (edn/read "account-config.edn")
                                (edn/read "taxes.edn")))]
               (add-record-with-dans buchen-file (into-array Object record)))
             {:status 200
              :body   json})
           (POST "/create-record" json
             (doseq [record (to-list-of-values
                              (generate-accounting-records
                                (:body json)
                                (edn/read "account-config.edn")
                                (edn/read "taxes.edn")))]
               (edit-record-with-dans buchen-file (into-array Object record)))
             {:status 200
              :body   json})

           (route/not-found " Not Found"))

(defn wrap-runtime-exception-handling [handler]
  (fn [request]
    (try
      (handler request)
      (catch Exception e
        (.printStackTrace e)                                ;; TODO: replace this with logging exception
        {:status  500
         ;; https://tools.ietf.org/html/rfc7807
         :headers {"Content-Type" "application/problem+json"}
         :body    (str "{"
                       "\"type\":\"de.switajski.fibu/server-error\","
                       "\"title\":\"Sorry something went wrong :(\","
                       "\"status\":500"
                       "}")}))))

(def app
  (-> (handler/api app-routes)
      (middleware/wrap-json-body {:keywords? true})
      (params-middleware/wrap-params)
      middleware/wrap-json-response
      wrap-runtime-exception-handling
      ))
