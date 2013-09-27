#!/bin/bash

mkdir temp

git checkout master
./build.py
cp build/ol*.js temp
cp css/*.css temp

./build.py apidoc
cp -r build/hosted/master/apidoc temp

git checkout gh-pages
cp -r temp/* .

git checkout master

rm -fr temp

git checkout gh-pages
