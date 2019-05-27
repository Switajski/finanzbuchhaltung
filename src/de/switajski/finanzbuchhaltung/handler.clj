(ns de.switajski.finanzbuchhaltung.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [compojure.route :as route]
            [de.switajski.dbf :as dbf]
            [clojure.java.io :as io]
            [ring.util.io :as ring-io])
  (:import [java.io BufferedInputStream FileInputStream]))

(def BUFFER-SIZE 8192)

(defn format-line [rec fields]
  (apply str
         (for [field fields]
           (format "\"%s\":\"%s\"," (name field) (field rec)))))

(defn stream!
  [in-file fields & {:keys [conv encoding]
                     :or   {conv {} encoding "UTF8"}}]
  (ring-io/piped-input-stream
   #(let [writer (io/make-writer % {})
          dbf-meta (dbf/read-dbf-meta in-file)
          dbf (BufferedInputStream. (FileInputStream. ^String in-file)
                                    BUFFER-SIZE)]
      (doseq [rec (dbf/read-records! dbf dbf-meta conv)]
        (when (not (:deleted rec))
          (.write writer (format "{%s}\n" (format-line rec fields)))
          (.flush writer))))))

(defroutes app-routes
  (GET "/" [] {:status 200
               :body   (stream!
                        "/tmp/buchen.dbf"
                        [:art :dat :konto :gegen :btext :rech_nr :datensatz :betrag_h :betrag_s :vmsteuer :bdatum :konto_art :klnummer :faellig :kklasse :zamek :bilg]
                        :fields {:kdse :chars-to-int
                                 :kse  :chars-to-int})})
  (route/not-found "Not Found"))

(def app
  (-> (handler/site app-routes)
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
