(ns de.switajski.fibu.writer_test
  (:require [clojure.test :refer :all]
            [de.switajski.fibu.writer :refer :all]
            [de.switajski.ednreader :as edn]))

(def path "/Users/switajski/Projects/finanzbuchhaltung/")

(def json-record
  {:pos           "679"
   :date          "2016-10-24"
   :debitAccount  "10206"
   :creditAccount "5000"
   :tax           "MSt19%"
   :datensatz     "A"
   :sum           6959.24
   :accountedDate "2016-10-24"
   :text          "Re.Nr. 7516 - update"})

(def json-record-2
  {:pos           "679"
   :debitAccount  "0840"
   :creditAccount "0840"
   :date          "2016-07-11"
   :accountedDate "2016-07-11"
   :sum           0.00
   :text          ""
   :tax           "VSt7%"})

(deftest transform-from-json
  (let [abc (generate-3-records-for-dbf
              json-record
              (edn/read (str path "account-config.edn"))
              (edn/read (str path "taxes.edn")))]
    (println (first abc))
    (println (nth abc 1))
    (println (nth abc 2))
    ))

(deftest transform-from-endpoint-to-dbf-writer-format
  (to-list-of-values (generate-3-records-for-dbf
                       json-record
                       (edn/read (str path "account-config.edn"))
                       (edn/read (str path "taxes.edn")))))

(deftest write-records
  (doseq [record (to-list-of-values
                   (generate-3-records-for-dbf
                     json-record
                     (edn/read (str path "account-config.edn"))
                     (edn/read (str path "taxes.edn"))))]
    (add-record-with-dans (str path "13.dbf") (into-array Object record))))

(deftest update-record
  (doseq [record-in-dbf (generate-3-records-for-dbf
                          json-record
                          (edn/read (str path "account-config.edn"))
                          (edn/read (str path "taxes.edn")))]
    (edit-record-with-dans
      (str path "13.dbf")
      record-in-dbf
      (calculate-index (:rech_nr record-in-dbf) (:datensatz record-in-dbf)))))

(run-tests)
