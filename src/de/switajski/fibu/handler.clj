(ns de.switajski.fibu.handler
  (:use ring.adapter.jetty
        ring.middleware.resource
        ring.middleware.content-type
        ring.middleware.not-modified)
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [ring.middleware.params :as params-middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            [de.switajski.writer :refer :all]
            [de.switajski.fibu.writer :refer :all]
            [de.switajski.ednreader :as edn]
            [clojure.java.io :as jio]
            [clojure.data.json :as json]
            [ring.util.io :as ring-io])
  (:import (java.math RoundingMode))
  (:gen-class))

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

(defn to-dbf-records [record-from-ui]
  (to-list-of-values
    (generate-records-for-dbf
      record-from-ui
      (edn/read "account-config.edn")
      (edn/read "taxes.edn"))))

(defn stream!
  [in-file & {:keys [transform reader]
              :or   {transform #(when true %)
                     reader    dbf/read-records!}}]
  (ring-io/piped-input-stream
    #(let [writer (jio/make-writer % {})
           dbf-meta (dbf/read-dbf-meta in-file)
           dbf (jio/input-stream in-file :buffer-size BUFFER-SIZE)]
       (.write writer "[{}")
       (doseq [rec (reader dbf dbf-meta {})]
         (when (not (:deleted rec))
           (.write writer ",")
           (json/write (transform rec) writer)))
       (.write writer "]")
       (.flush writer))))


(defn records-of [in-file]
  (let [dbf-meta (dbf/read-dbf-meta in-file)
        dbf (jio/input-stream in-file :buffer-size BUFFER-SIZE)]
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
           (GET "/guv" []
             {:status 200
              :body   {:sum
                       (number-format
                         (reduce #(if (= "A" (:kklasse %2))
                                    (+ %1 (:betrag_h %2))
                                    %1)
                                 0
                                 (records-of buchen-file)))}})
           (GET "/account-plan" []
             {:status 200
              :body   (records-of "konten2.dbf")})
           (GET "/taxes" []
             {:status 200
              :body   (edn/read "taxes.edn")})              ;TODO: fa08.dbf instead of config file
           (POST "/create-record" req
             (doseq [record (to-dbf-records (:body req))]
               (add-record-with-dans buchen-file (into-array Object record)))
             {:status 200
              :body   (:body req)})
           (POST "/update-record" req
             (let [rec-map (:body req)]
               (doseq [record-in-dbf (generate-records-for-dbf
                                       (:body req)
                                       (edn/read "account-config.edn")
                                       (edn/read "taxes.edn"))]
                 (edit-record-with-dans
                   buchen-file
                   record-in-dbf
                   (calculate-index (:rech_nr record-in-dbf) (:datensatz record-in-dbf))))
               {:status 200
                :body   rec-map}))

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

(defn wrap-dir-index [handler]
  (fn [req]
    (handler
      (update-in req [:uri]
                 #(if (= "/" %) "/index.html" %)))))

(def app
  (-> app-routes
      (wrap-resource "public/build")
      (wrap-content-type)
      (wrap-not-modified)
      (wrap-dir-index)
      (handler/api)
      (middleware/wrap-json-body {:keywords? true})
      (params-middleware/wrap-params)
      middleware/wrap-json-response
      wrap-runtime-exception-handling))

(defn -main
  [& args]
  (run-jetty app {:port 3333}))