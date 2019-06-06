(ns de.switajski.writer
  (:require [clojure.test :refer :all]))

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

(deftest write-record
  (add-record "/tmp/buchen_test.dbf" (into-array Object sample-record)))

;[
; "art" : "V",
; "dat" : "2018-01-01",
; "konto" : "0870",
; "gegen" : "8000",
; "btext" : "Buero",
; "rech_nr" :1,
; "datensatz" : "A",
; "betrag_h" :0.0,
; "betrag_s" :4.0,
; "vmsteuer" : "VSt0%",
; "bdatum" : "2018-01-01",
; "konto_art" : "S",
; "klnummer" : "",
; "faelig" : "",
; "kklasse" : "K"
; "zamek" : "FALSE",
; "bilg" : "B",
; ]



(run-tests)
