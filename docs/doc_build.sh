#!/bin/bash

cd src
for file in ./*.asc
	do asciidoctor -b html -D ../build/ $file 
done