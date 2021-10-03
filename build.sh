#!/bin/bash
pdflatex -synctex=1 -interaction=nonstopmode dissertation.tex
bibtex dissertation.aux
pdflatex -synctex=1 -interaction=nonstopmode dissertation.tex
pdflatex -synctex=1 -interaction=nonstopmode dissertation.tex
