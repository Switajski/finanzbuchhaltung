(ns de.switajski.writer_test
  (:require [clojure.test :refer :all]
            [de.switajski.writer :refer :all]
            [de.switajski.ednreader :as edn]))

(def path "/Users/switajski/Projects/finanzbuchhaltung/resources/")

(def sample-record [
                    "V"                                     ;1 art
                    (java.util.Date.)                       ;2 dat
                    "0870"                                  ;3 konto
                    "8000"                                  ;4 gegen
                    "Buero"                                 ;5 btext
                    (java.math.BigDecimal. 1)               ;6 rech_nr
                    "A"                                     ;7 datensatz
                    (java.math.BigDecimal. 0.0)             ;8 "betrag_h"
                    (java.math.BigDecimal. 4.0)             ;9 "betrag_s"
                    "VSt0%"                                 ;10 "vmsteuer"
                    (java.util.Date.)                       ;11 "bdatum" : "2018-01-01",
                    "S"                                     ;12 "konto_art"
                    ""                                      ;13 "klnummer"
                    (java.util.Date.)                       ;14 "faelig"
                    "K"                                     ;15 "kklasse"
                    false                                   ;16 "zamek"
                    "B"                                     ;17 "bilg"
                    ]
  )



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
    (println (nth abc 2))))

(deftest transform-from-endpoint-to-dbf-writer-format
  (let [abc (to-dbf-writer-format (generate-accounting-records
                                    json-record
                                    (edn/read (str path "account-config.edn"))
                                    (edn/read (str path "taxes.edn"))))]
    (println (first abc))
    (println (vec (nth abc 1)))
    (println (nth abc 2))))

(def sample-record [
                    "V"                                     ;1 art
                    (java.util.Date.)                       ;2 dat
                    "0870"                                  ;3 konto
                    "8000"                                  ;4 gegen
                    "Buero"                                 ;5 btext
                    (java.math.BigDecimal. 1)               ;6 rech_nr
                    "A"                                     ;7 datensatz
                    (java.math.BigDecimal. 0.0)             ;8 "betrag_h"
                    (java.math.BigDecimal. 4.0)             ;9 "betrag_s"
                    "VSt0%"                                 ;10 "vmsteuer"
                    (java.util.Date.)                       ;11 "bdatum" : "2018-01-01",
                    "S"                                     ;12 "konto_art"
                    ""                                      ;13 "klnummer"
                    (java.util.Date.)                       ;14 "faelig"
                    "K"                                     ;15 "kklasse"
                    false                                   ;16 "zamek"
                    "B"                                     ;17 "bilg"
                    ]
  )

(deftest write-records
  (doseq [record (to-dbf-writer-format
                   (generate-accounting-records
                     json-record
                     (edn/read (str path "account-config.edn"))
                     (edn/read (str path "taxes.edn"))))]
    (add-record-with-dans "/tmp/buchen11.dbf" (into-array Object record))))

(run-tests)
