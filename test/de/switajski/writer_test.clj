(ns de.switajski.writer_test
  (:require [clojure.test :refer :all]
            [de.switajski.writer :refer :all]
            [de.switajski.ednreader :as edn]))

(def path "/Users/switajski/Projects/finanzbuchhaltung/resources/")

(def json-record
  {:pos           "660"
   :date          "24.10.16"
   :debitAccount  "10206"
   :creditAccount "5000"
   :tax           "MSt19%"
   :datensatz     "A"
   :sum           6959.24
   :accountedDate "24.10.16"
   :text          "Re.Nr. 7516"})

(deftest transform-from-json
  (let [abc (generate-accounting-records
              json-record
              (edn/read (str path "account-config.edn"))
              (edn/read (str path "taxes.edn")))]
    (println (first abc))
    (println (nth abc 1))
    (println (nth abc 2))
    ))

(deftest transform-from-endpoint-to-dbf-writer-format
  (to-list-of-values (generate-accounting-records
                       json-record
                       (edn/read (str path "account-config.edn"))
                       (edn/read (str path "taxes.edn")))))


(defn add-record-with-dans [file record]
  (let [table (nl.knaw.dans.common.dbflib.Table. (java.io.File. file))]
    (try (.open table)
         (.addRecord table record)
         (finally (.close table)))))

(deftest write-records
  (doseq [record (to-list-of-values
                   (generate-accounting-records
                     json-record
                     (edn/read (str path "account-config.edn"))
                     (edn/read (str path "taxes.edn"))))]
    (add-record-with-dans "/tmp/13.dbf" (into-array Object record))))

(run-tests)
