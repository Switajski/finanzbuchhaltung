(defproject de.switajski.finanzbuchhaltung "2.1.11-SNAPSHOT"
  :description "Simple accounting web application using DBF files"
  :url "https://finanzbuchhaltung.switajski.de"
  :min-lein-version "2.0.0"
  :license {:name "Eclipse Public License"
            :url  "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [ring/ring-core "1.7.1"]
                 [ring/ring-jetty-adapter "1.7.1"]
                 [ring/ring-json "0.3.1"]
                 [ring/ring-defaults "0.3.2"]
                 [compojure "1.6.1"]
                 [com.switajski/dans-dbf-lib "1.0.0-beta-13"]
                 [org.clojure/data.json "0.2.6"]]
  :scm {:name "git" :url "https://github.com/switajski/finanzbuchhaltung"}
  :plugins [[lein-ring "0.12.5"]
            [lein-s3-uberjar-release "0.1.0"]
            [lein-pprint "1.2.0"]
            [lein-shell "0.5.0"]]
  :shell {:dir "src-frontend"}
  :release-tasks [["vcs" "assert-committed"]
                  ["change" "version" "leiningen.release/bump-version" "release"]
                  ["shell" "npm" "version" "--allow-same-version" "${:version}"]
                  ["shell" "yarn" "build"]
                  ["vcs" "commit"]
                  ["vcs" "tag" "--no-sign"]
                  ["deploy"]
                  ["change" "version" "leiningen.release/bump-version"]
                  ["vcs" "commit"]
                  ["vcs" "push"]]
  :main de.switajski.fibu.handler
  :ring {:handler de.switajski.fibu.handler/app
         :port    4000
         :nrepl   {:start? true :port 4001}}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}}
  :s3-uberjar-release {:bucket "public-switajski"
                       :prefix "/releases"}
  ;:jvm-opts ["-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5010"] ;for debugging https://stackoverflow.com/questions/56300204/how-to-debug-a-clojure-web-application-in-intellij
  )
