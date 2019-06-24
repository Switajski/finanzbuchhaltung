(ns de.switajski.ednreader
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn read
  "Load edn from an io/reader source (filename or io/resource)."
  [source]
  (try
    (with-open [reader (io/reader source)]
      (edn/read (java.io.PushbackReader. reader)))

    (catch java.io.IOException e
      (printf "Couldn't open '%s': %s\n" source (.getMessage e)))))
