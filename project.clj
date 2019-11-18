(defproject de.switajski.finanzbuchhaltung "0.1.0-SNAPSHOT"
  :description "Simple accounting web application using DBF files"
  :url "https://finanzbuchhaltung.switajski.de"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [ring/ring-core "1.7.1"]
                 [ring/ring-jetty-adapter "1.7.1"]
                 [ring/ring-json "0.3.1"]
                 [ring/ring-defaults "0.3.2"]
                 [compojure "1.6.1"]
                 [nl.knaw.dans.common/dans-dbf-lib "1.0.0-beta-10"]
                 [org.clojure/data.json "0.2.6"]]
  :plugins [[lein-ring "0.12.5"]]
  :main de.switajski.fibu.handler
  :ring {:handler de.switajski.fibu.handler/app
         :port    4000
         :nrepl   {:start? true :port 4001}}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}}
  :jvm-opts ["-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5010"] ;for debugging https://stackoverflow.com/questions/56300204/how-to-debug-a-clojure-web-application-in-intellij
  )