(ns de.switajski.fibu.writer
  (:import (java.math RoundingMode)
           (nl.knaw.dans.common.dbflib Table)
           (nl.knaw.dans.common.dbflib Record))
  (:require [clojure.string :as string]
            [de.switajski.ednreader :as edn])
  (:gen-class))

(defn calculate-index
  "Calculates should-be-index of a record with given invoice_nr and datensatz. Example:

  RECH_NR 1
  1 A
  2 B
  3 C

  RECH_NR 2
  4 A
  5 B
  6 C

  RECH_NR 3
  7 A
  8 B
  9 C"
  [rech-nr datensatz]
  (- (* 3 rech-nr)
     (case datensatz
       "A" 2
       "B" 1
       "C" 0) 1))

(defn find-kontoart [accountNo account-config]
  (get-in account-config [:konto_art (keyword (subs accountNo 0 2))] "S"))
(defn find-kklasse [accountNo account-config]
  (get-in account-config [:kklasse (keyword (subs accountNo 0 1))] " "))

(defn find-tax [tax-key taxes]
  (first (filter #(= tax-key (:fasuch %)) taxes)))
(defn find-tax-rate [tax-key taxes]
  (:famwst (find-tax tax-key taxes)))

(defn to-java-util-date [d] (.parse (java.text.SimpleDateFormat. "yyyy-MM-dd") d))
(defn to-java-double [n] (.doubleValue (.setScale (java.math.BigDecimal. n) 2 RoundingMode/HALF_UP)))

(defn generate-3-records-for-dbf
  [f & {:keys [date-parser number-parser account-config taxes]
        :or   {date-parser    to-java-util-date
               number-parser  to-java-double
               account-config (edn/read "account-config.edn")
               taxes          (edn/read "taxes.edn")}}]
  (let [d {:art      "V"
           :dat      (date-parser (:date f))
           :rech_nr  (number-parser (:pos f))
           :btext    (:text f)
           :vmsteuer (:tax f)
           :bdatum   (date-parser (:accountedDate f))
           :klnummer ""
           :faelig   nil
           :zamek    nil
           :bilg     ""}
        tax-account (:konto_nr (find-tax (:tax f) taxes))
        sum (number-parser (:sum f))
        tax (- sum (/ sum
                      (+ 1 (/ (find-tax-rate (:tax f) taxes)
                              100))))

        a (assoc d :datensatz "A"
                   :konto (:debitAccount f)
                   :gegen (:creditAccount f)
                   :konto_art (find-kontoart (:debitAccount f) account-config)
                   :kklasse (find-kklasse (:debitAccount f) account-config)
                   :betrag_h (number-parser 0.00)
                   :betrag_s sum
                   )
        b (assoc d :datensatz "B"
                   :konto tax-account
                   :gegen (:debitAccount f)
                   :konto_art (find-kontoart tax-account account-config)
                   :kklasse (find-kklasse tax-account account-config)
                   :betrag_h (number-parser 0.00)
                   :betrag_s (number-parser tax)
                   )
        c (assoc d :datensatz "C"
                   :konto (:creditAccount f)
                   :gegen (:debitAccount f)
                   :konto_art (find-kontoart (:creditAccount f) account-config)
                   :kklasse (find-kklasse (:creditAccount f) account-config)
                   :betrag_h sum
                   :betrag_s (number-parser 0.00))
        ]
    [a b c]))

(defn transform-map-for-dans-dbf [map charset]
  (into {}
        (for [[k v] map]
          [(subs (string/upper-case k) 1) (Table/createValueObject v charset)])))

(defn create-dans-dbf-record [rec-map charset]
  (Record. (java.util.HashMap. (transform-map-for-dans-dbf rec-map charset))))

(defn add-record-with-dans
  "record should be a ordered list of values. Order should be the same as in dbf format"
  [file record]
  (let [table (Table. (java.io.File. file))]
    (try (.open table)
         (.addRecord table (create-dans-dbf-record record (.getCharsetName table)))
         (finally (.close table)))))

(defn edit-record-with-dans
  "record should be a map"
  [file record index]
  (let [table (Table. (java.io.File. file))]
    (try (.open table)
         (.updateRecordAt table
                          index
                          (create-dans-dbf-record record (.getCharsetName table)))
         (finally (.close table)))))