(ns de.switajski.writer
  (:import (com.linuxense.javadbf DBFWriter)
           (java.io File)
           (java.math RoundingMode))
  (:gen-class))

(defn add-record [file-path record]                         ;ISO-8859-1
  (let [writer (DBFWriter. (File. file-path))]
    (.addRecord writer record)))


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

(def date-format (java.text.SimpleDateFormat. "dd.MM.yy"))
(defn parse-date [d] (.parse date-format d))

(defn format-number [n] (.doubleValue (.setScale (java.math.BigDecimal. n) 2 RoundingMode/HALF_UP)))

(defn do-order-values [record, ordered-keys]
  (map #((keyword %) record) ordered-keys))
(defn to-dbf-writer-format [records]
  (map #(vec (do-order-values % order-of-dbf-record-values)) records))

(defn generate-accounting-records [f account-config taxes]
  (let [d {:art      "V"
           :dat      (parse-date (:date f))
           :rech_nr  (format-number (:pos f))
           :btext    (:text f)
           :vmsteuer (:tax f)
           :bdatum   (parse-date (:accountedDate f))
           :klnummer ""
           :faelig   (parse-date (:accountedDate f))
           :zamek    false
           :bilg     ""}
        tax-account (:konto_nr (find-tax (:tax f) taxes))
        tax (- (:sum f)
               (/ (:sum f)
                  (+ 1 (/ (find-tax-rate (:tax f) taxes)
                          100))))

        a (assoc d :datensatz "A"
                   :konto (:debitAccount f)
                   :gegen (:creditAccount f)
                   :konto_art (find-kontoart (:debitAccount f) account-config)
                   :kklasse (find-kklasse (:debitAccount f) account-config)
                   :betrag_h (format-number 0.00)
                   :betrag_s (format-number (:sum f))
                   )
        b (assoc d :datensatz "B"
                   :konto tax-account
                   :gegen (:debitAccount f)
                   :konto_art (find-kontoart tax-account account-config)
                   :kklasse (find-kklasse tax-account account-config)
                   :betrag_h (format-number 0.00)
                   :betrag_s (format-number tax)
                   )
        c (assoc d :datensatz "C"
                   :konto (:creditAccount f)
                   :gegen (:debitAccount f)
                   :konto_art (find-kontoart (:creditAccount f) account-config)
                   :kklasse (find-kklasse (:creditAccount f) account-config)
                   :betrag_h (format-number (:sum f))
                   :betrag_s (format-number 0.00))
        ]
    [a b c]))