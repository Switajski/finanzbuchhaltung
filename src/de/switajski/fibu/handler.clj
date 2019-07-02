(ns de.switajski.fibu.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            [de.switajski.writer :refer :all]
            [de.switajski.ednreader :as edn]
            [clojure.java.io :as io]
            [clojure.data.json :as json]
            [ring.util.io :as ring-io])
  (:import [java.io BufferedInputStream FileInputStream]))

(def BUFFER-SIZE 8192)
(def path "/Users/switajski/Projects/finanzbuchhaltung/resources/")

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
  [in-file & {:keys [conv transform reader]
              :or   {conv      {}
                     transform #(when true %)
                     reader    dbf/read-records!}}]
  (ring-io/piped-input-stream
    #(let [writer (io/make-writer % {})
           dbf-meta (dbf/read-dbf-meta in-file)
           dbf (BufferedInputStream. (FileInputStream. ^String in-file)
                                     BUFFER-SIZE)]
       (.write writer "[{}")
       (doseq [rec (reader dbf dbf-meta conv)]
         (when (not (:deleted rec))
           (.write writer ",")
           (json/write (transform rec) writer)))
       (.write writer "]")
       (.flush writer))))

(defroutes app-routes
           (GET "/accounting-records" [] {:status 200
                                          :body   (stream! (str path "buchen.dbf")
                                                           :reader dbf/read-accounting-records!
                                                           :transform to-json
                                                           )})
           (GET "/account-plan" [] {:status 200
                                    :body   (stream! (str path "konten2.dbf"))})
           (GET "/taxes" [] {:status 200
                             :body   (edn/read (str path "taxes.edn"))}) ;TODO: fa08.dbf instead of config file
           (POST "/create-record" request
             (let [body (:body request)
                   result (add-record "/tmp/buchen_test.dbf" (into-array Object body))]
               {:status 200
                :body   result}))

           (route/not-found " Not Found"))

(def app
  (-> (handler/site app-routes)
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
