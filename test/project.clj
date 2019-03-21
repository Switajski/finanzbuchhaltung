(defproject de.switajski.finanzbuchhaltung "0.1.0-SNAPSHOT"
  :description "Simple accounting web application using DBF files"
  :url "https://finanzbuchhaltung.switajski.de"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [ring/ring-json "0.3.1"]
                 [ring/ring-defaults "0.3.2"]]
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler finanzbuchhaltung.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}})
