#!/bin/bash

I=0

while read line
do
  node_modules//intern//bin//intern-runner.js config=tests/intern increment=$I functionalSuites=$line &
  ((I++))
done < tests/tests.txt