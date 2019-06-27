(ns de.switajski.writer
  (:import (com.linuxense.javadbf DBFWriter)
           (java.io File))
  (:gen-class))

(defn add-record [file-path record]
  (let [writer (DBFWriter. (File. file-path))]
    (.addRecord writer record)))