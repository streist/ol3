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
rm -rf temp

print " !!! IMPORTANT !!!"
print "You need to add and commit your files"
