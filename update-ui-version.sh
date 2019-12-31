#!/bin/bash

echo "Building UI"
VERSION=$(clojure get-version.clj)
cd src-frontend
echo "setting version in package.json to ${VERSION}"
npm version ${VERSION}
