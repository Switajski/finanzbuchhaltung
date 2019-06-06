(ns de.switajski.writer
  (:import (com.linuxense.javadbf DBFWriter)
           (java.io File)))

(defn add-record [file-path record]
  (let [writer (DBFWriter. (File. file-path))]
    (.addRecord writer record)))

;(de.switajski.writer/add-record "/tmp/buchen_test.dbf"
;                                (into-array
;                                  (map #(:name %)
;                                       (:fields (de.switajski.dbf/read-dbf-meta "/tmp/buchen.dbf")))))
;(map #(:name %) (:fields (de.switajski.dbf/read-dbf-meta "/tmp/buchen.dbf")))