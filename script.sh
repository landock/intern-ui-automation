#!/bin/bash

I=9000

while read line
do
  node_modules//intern//bin//intern-runner.js config=tests/intern functionalSuites=$line proxyPort=$I &
  ((I++))
done < tests/tests.txt