(ns de.switajski.fibu.calculation)

(defn summarize [accounting-records number-format]
  (map (fn [[konto vals]]
         {:account konto
          :debit   (number-format (reduce + (map :betrag_h vals)))
          :credit  (number-format (reduce + (map :betrag_s vals)))
          :kklasse (:kklasse (first vals))})
       (group-by :konto accounting-records)))

(defn account-overview [accounting-records number-format]
  (group-by :kklasse (summarize accounting-records number-format)))

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

(defn to-month [date]
  (subs date 0 7))

(defn sum-by-month [accounting-records kklasse sum-field number-format]
  (reduce-kv (fn [guv month records-in-month]
               (assoc
                 guv
                 month
                 (number-format
                   (reduce + (->> records-in-month
                                  (filter #(= kklasse (:kklasse %)))
                                  (map (keyword sum-field)))))))
             {}
             (group-by #(to-month (:bdatum %)) accounting-records)))