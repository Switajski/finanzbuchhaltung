(ns de.switajski.writer
  (:import (com.linuxense.javadbf DBFWriter)
           (java.io File)))

(defn add-record [file-path record]
  (let [writer (DBFWriter. (File. file-path))]
    (.addRecord writer record)))