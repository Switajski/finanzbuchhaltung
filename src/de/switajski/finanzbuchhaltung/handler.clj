(ns de.switajski.finanzbuchhaltung.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            ;; experimental streaming from https://nelsonmorris.net/2015/04/22/streaming-responses-using-ring.html or https://stackoverflow.com/questions/46288109/how-to-stream-a-large-csv-response-from-a-compojure-api-so-that-the-whole-respon
            [clojure.data.xml :as xml]
            [clojure.java.io :as io]
            [ring.util.io :as ring-io])
  (:import [java.io BufferedInputStream FileInputStream]))

(def BUFFER-SIZE 8192)
(defn stream!
  [in-file fields & {:keys [conv encoding delimiter]
                     :or {conv {} encoding "UTF8" delimiter "|"}}]
  (ring-io/piped-input-stream
   #(let [writer (io/make-writer % {})
          dbf-meta (dbf/read-dbf-meta in-file)
          dbf (BufferedInputStream. (FileInputStream. ^String in-file)
                                    BUFFER-SIZE)]
      (doseq [rec (dbf/read-records! dbf dbf-meta conv)]
        (when (not (:deleted rec))
          (.write writer
                  (apply str (interpose delimiter
                                        (for [field fields]
                                          (field rec)))))
          (.flush writer))))))

(defroutes app-routes
  (GET "/" [] {:status 200
               :body (stream!
                      "/tmp/buchen.dbf"
                      [:art :dat :konto :gegen :btext :rech_nr :datensatz :betrag_h :betrag_s :vmsteuer :bdatum :konto_art :klnummer :faellig :kklasse :zamek :bilg]
                      :fields {:kdse :chars-to-int
                               :kse :chars-to-int})})
  (GET "/export-to-csv" [] {:status 200
                            :body (dbf/export-to-csv!
                                   "/tmp/buchen.dbf"
                                   "/tmp/buchen.csv"
                                   [:art :dat :konto :gegen :btext :rech_nr :datensatz :betrag_h :betrag_s :vmsteuer :bdatum :konto_art :klnummer :faellig :kklasse :zamek :bilg]
                                   :fields {:kdse :chars-to-int
                                            :kse :chars-to-int})})
  (route/not-found "Not Found"))

(def app
  (-> (handler/site app-routes)
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
