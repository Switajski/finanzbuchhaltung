(ns de.switajski.writer
  (:import (java.math RoundingMode))
  (:gen-class))

(def order-of-dbf-record-values [:art
                                 :dat
                                 :konto
                                 :gegen
                                 :btext
                                 :rech_nr
                                 :datensatz
                                 :betrag_h
                                 :betrag_s
                                 :vmsteuer
                                 :bdatum
                                 :konto_art
                                 :klnummer
                                 :faelig
                                 :kklasse
                                 :zamek
                                 :bilg])


(defn find-kontoart [accountNo account-config]
  (get-in account-config [:konto_art (keyword (subs accountNo 0 2))] "S"))
(defn find-kklasse [accountNo account-config]
  (get-in account-config [:kklasse (keyword (subs accountNo 0 1))] " "))

(defn find-tax [tax-key taxes]
  (first (filter #(= tax-key (:fasuch %)) taxes)))
(defn find-tax-rate [tax-key taxes]
  (:famwst (find-tax tax-key taxes)))

(defn to-java-util-date [d] (.parse (java.text.SimpleDateFormat. "dd.MM.yy") d))
(defn to-java-double [n] (.doubleValue (.setScale (java.math.BigDecimal. n) 2 RoundingMode/HALF_UP)))

(defn to-list-of-values [records]
  (defn order-values [record, ordered-keys]
    (map #((keyword %) record) ordered-keys))
  (map #(vec (order-values % order-of-dbf-record-values)) records))

(defn generate-accounting-records [f account-config taxes
                                   & {:keys [date-parser number-parser]
                                      :or   {date-parser   to-java-util-date
                                             number-parser to-java-double}}]
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

(defn add-record-with-dans [file record]
  (let [table (nl.knaw.dans.common.dbflib.Table. (java.io.File. file))]
    (try (.open table)
         (.addRecord table record)
         (finally (.close table)))))