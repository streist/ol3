#!/bin/bash

mkdir temp

git checkout master
./build.py
cp build/ol*.js temp
cp css/*.css temp

git checkout gh-pages
cp temp/* .

git checkout master

rm -fr temp

git checkout gh-pages
