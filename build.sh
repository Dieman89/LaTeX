#!/bin/bash
cd "$1" || exit
mkdir output
pdflatex -output-directory=output -synctex=1 -interaction=nonstopmode "${PWD##*/}.tex"
bibtex "output/${PWD##*/}.aux"
pdflatex -output-directory=output -synctex=1 -interaction=nonstopmode "${PWD##*/}.tex"
pdflatex -output-directory=output -synctex=1 -interaction=nonstopmode "${PWD##*/}.tex"
