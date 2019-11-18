(ns de.switajski.fibu.writer)

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