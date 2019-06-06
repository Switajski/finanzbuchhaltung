(ns de.switajski.fibu.handler-test
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [de.switajski.fibu.handler :refer :all]))

(deftest test-app
  (testing "main route"
    (let [response (app (mock/request :get "/api"))]
      (is (= (:status response) 200))))

  (testing "not-found route"
    (let [response (app (mock/request :get "/invalid"))]
      (is (= (:status response) 404)))))

(run-tests)