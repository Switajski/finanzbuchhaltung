(ns de.switajski.finanzbuchhaltung.handler
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [compojure.route :as route]))

(defroutes app-routes
  (GET "/" [] {:status 200
               :body {:name "John Doe" :desc "some guy"}})
  (route/not-found "Not Found"))

(def app
  (-> (handler/site app-routes)
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
