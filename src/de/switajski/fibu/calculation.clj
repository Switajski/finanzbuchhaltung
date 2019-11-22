(ns de.switajski.fibu.calculation)

(defn summarize [accounting-records]
  (map (fn [[konto vals]]
         {:account konto
          :debit   (reduce + (map :betrag_h vals))
          :credit  (reduce + (map :betrag_s vals))
          :kklasse (:kklasse (first vals))})
       (group-by :konto accounting-records)))

(defn account-overview [accounting-records]
  (group-by :kklasse (summarize accounting-records)))

(defn account-expressive [accounting-records account-no]
  (map (fn [r] {:pos           (:rech_nr r)
                :account       (:konto r)
                :gegen         (:gegen r)
                :accountedDate (:bdatum r)
                :date          (:dat r)
                :text          (:btext r)
                :debit         (:betrag_h r)
                :credit        (:betrag_s r)})
       (filter #(= account-no (:konto %1)) accounting-records)))