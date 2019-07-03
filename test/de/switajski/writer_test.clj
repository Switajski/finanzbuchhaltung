(ns de.switajski.writer_test
  (:require [clojure.test :refer :all]
            [de.switajski.writer :refer :all]
            [de.switajski.ednreader :as edn]))

(def path "/Users/switajski/Projects/finanzbuchhaltung/resources/")

(def json-record
  {:pos           "679"
   :date          "24.10.16"
   :debitAccount  "10206"
   :creditAccount "5000"
   :tax           "MSt19%"
   :datensatz     "A"
   :sum           6959.24
   :accountedDate "24.10.16"
   :text          "Re.Nr. 7516"})

(def json-record-2
  {:pos           "679"
   :debitAccount  "0840"
   :creditAccount "0840"
   :date          "07.11.16"
   :accountedDate "07.11.16"
   :sum           0.00
   :text          ""
   :tax           "VSt7%"})

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

(deftest write-records
  (doseq [record (to-list-of-values
                   (generate-accounting-records
                     json-record
                     (edn/read (str path "account-config.edn"))
                     (edn/read (str path "taxes.edn"))))]
    (add-record-with-dans "/tmp/13.dbf" (into-array Object record))))

(run-tests)
