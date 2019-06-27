(ns de.switajski.dbf
  (:require [clojure.string :as str])
  (:import [java.io BufferedInputStream FileInputStream])
  (:gen-class))

(def BUFFER-SIZE 8192)

(defn byte-to-int
  "Convert two or four bytes to integer value"
  ([b1 b2]
   (byte-to-int b1 b2 0 0))
  ([b1 b2 b3 b4]
   (bit-or b1
           (bit-shift-left b2 8)
           (bit-shift-left b3 16)
           (bit-shift-left b4 24))))

(defn bytes-to-str
  "Convert given bytes to string representation"
  [& bytes]
  (-> bytes
      byte-array
      (String. (java.nio.charset.Charset/forName "CP866"))
      str/trim))

(defn read-bytes!
  "Read specific number of bytes from file"
  [file n]
  (doall (for [_ (range n)]
           (.read ^BufferedInputStream file))))

(defn read-as-string!
  "Read specified number of bytes as string"
  [f n]
  (apply bytes-to-str
         (read-bytes! f n)))

(defn read-db-meta
  "Read dbf`s file meta.

  Take a file name string and returns a map"
  [file]
  (with-open [db (BufferedInputStream.
                   (FileInputStream. ^String file) BUFFER-SIZE)]
    {:db-version    (.read ^BufferedInputStream db)
     :last-modified {:year  (.read ^BufferedInputStream db)
                     :month (.read ^BufferedInputStream db)
                     :day   (.read ^BufferedInputStream db)}
     :num-records   (apply byte-to-int (read-bytes! db 4))
     :first-offset  (apply byte-to-int (read-bytes! db 2))
     :record-length (apply byte-to-int (read-bytes! db 2))}))

(defn read-records-meta
  "Read records metadata

  Take file as string and offset of first dbf data record. Return
  sequence of records meta maps"
  ([file]
   (read-records-meta file (:first-offset (read-db-meta file))))
  ([file first-offset]
   (with-open [db (BufferedInputStream.
                    (FileInputStream. ^String file) BUFFER-SIZE)]
     (.skip ^BufferedInputStream db 32)                     ;;skip main dbf meta - first 32b
     (doall
       (map #(dissoc % :dumb)
            (for [_ (range (/ (- first-offset 32 1) 32))]
              {:name
                                  (apply bytes-to-str
                                         (filter
                                           (complement zero?)
                                           (for [_ (range 11)]
                                             (.read ^BufferedInputStream db))))
               :type              (char (.read ^BufferedInputStream db))
               :offset            (apply byte-to-int (read-bytes! db 4))
               :length            (.read ^BufferedInputStream db)
               :fractional-length (.read ^BufferedInputStream db)
               :dumb              (.skip ^BufferedInputStream db 14)}))))))

(defn read-dbf-meta
  "Read full meta map of dbf file"
  [file]
  (let [db-meta (read-db-meta file)]
    (assoc db-meta
      :fields (vec (read-records-meta
                     file
                     (:first-offset db-meta))))))

(def conv-functs)

(defn read-field-val!
  "Read and convert field's value. Take a conv map that contain
  keywords pair of field name and func name for special case
  conversion of field data. m is a map to which result will by
  added. A forth parameter is a map of field metadata"
  [dbf conv m {:keys [name type length fractional-length]}]
  (let [kv (keyword (str/lower-case name))]
    (assoc m kv
             (cond
               (contains? conv kv)
               (apply ((kv conv) conv-functs) (read-bytes! dbf length))
               (= type \C) (read-as-string! dbf length)
               (= type \D) (let [date (read-as-string! dbf length)]
                             (if (str/blank? date)
                               ""
                               (str (subs date 0 4) "-"
                                    (subs date 4 6) "-"
                                    (subs date 6))))
               (= type \L) (let [val (read-bytes! dbf length)]
                             (if (= (char (first val)) \T)
                               "TRUE"
                               "FALSE"))
               (or (= type \N)
                   (= type \F))
               (let [s (read-as-string! dbf length)
                     val (try (if (or (str/blank? s) (= s "."))
                                0.0
                                (java.math.BigDecimal.
                                  ^String s))
                              (catch NumberFormatException e
                                (binding [*out* *err*]
                                  (print "bad value: type: " type
                                         "key: " kv " - ")
                                  ([println] s))
                                0.0))]
                 (if (= fractional-length 0)
                   (int val)
                   (double val)))

               (= type \M) (str "MEMO_" (let [s (read-as-string! dbf length)]
                                          (when (not (str/blank? s))
                                            (Integer/parseInt s))))
               :default (vec (read-bytes! dbf length))))))

(defn read-records!
  "Return a lazy sequence of record maps. Because of leziness the
  function must be used in a scope of opened dbf file. It also take
  dbf metadata and map of conversion function. A conv map contains
  keys as field names like {:feild-name conv-function, ...} and may by
  used in special cases, othewise - empty map."
  [dbf dbf-meta conv]
  (let [{:keys [first-offset
                fields
                num-records]} dbf-meta
        _ (.skip ^BufferedInputStream dbf first-offset)]
    (for [_ (range num-records)]
      (let [tmp (assoc {} :deleted
                          (if (= 0x20 (.read ^BufferedInputStream dbf))
                            false true))]
        (reduce (partial read-field-val! dbf conv)
                tmp fields)))))

(defn read-accounting-records!
  [dbf dbf-meta conv]
  (map #(first %)                                           ;1st datensatz always "A", promise!
       (partition-by :rech_nr (read-records! dbf dbf-meta conv))))

(defn chars-to-int
  "Example of function that convert three characters to integer
  value. (It was a case when developer used a three char as index in
  his tables may be for space saving.)"
  [c1 c2 c3]
  (byte-to-int (dec c3) (dec c2) (dec c1) 0))

(def conv-functs {:chars-to-int chars-to-int
                  :bytes-to-str bytes-to-str})

