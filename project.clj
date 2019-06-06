(defproject de.switajski.finanzbuchhaltung "0.1.0-SNAPSHOT"
  :description "Simple accounting web application using DBF files"
  :url "https://finanzbuchhaltung.switajski.de"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [ring/ring-json "0.3.1"]
                 [ring/ring-defaults "0.3.2"]
                 [com.github.albfernandez/javadbf "1.9.4"]
                 [org.clojure/data.json "0.2.6"]]
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler de.switajski.fibu.handler/app
         :port    4000
         :nrepl   {:start? true}}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}})
