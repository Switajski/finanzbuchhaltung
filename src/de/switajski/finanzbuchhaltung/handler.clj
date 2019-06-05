(ns de.switajski.finanzbuchhaltung.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            [clojure.java.io :as io]
            [clojure.data.json :as json]
            [ring.util.io :as ring-io])
  (:import [java.io BufferedInputStream FileInputStream]))

(def BUFFER-SIZE 8192)

(defn stream!
  [in-file & {:keys [conv encoding]
              :or   {conv {} encoding "UTF8"}}]
  (ring-io/piped-input-stream
    #(let [writer (io/make-writer % {})
           dbf-meta (dbf/read-dbf-meta in-file)
           dbf (BufferedInputStream. (FileInputStream. ^String in-file)
                                     BUFFER-SIZE)]
       (.write writer "[{}")
       (doseq [rec (dbf/read-records! dbf dbf-meta conv)]
         (when (not (:deleted rec))
           (.write writer ",")
           (json/write rec writer)))
       (.write writer "]")
       (.flush writer))))

(defroutes app-routes
           (GET "/api" [] {:status 200
                           :body   (stream!
                                     "/tmp/buchen.dbf"
                                     :fields {:kdse :chars-to-int
                                              :kse  :chars-to-int})})
           (route/not-found "Not Found"))

(def app
  (-> (handler/site app-routes)
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
