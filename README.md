# My LaTeX Projects

[![GitHub Super-Linter](https://github.com/Dieman89/dissertation/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/Dieman89/dissertation)

This is a collection of my third-year projects in LaTeX. It includes all the reports, logbooks, and final year projects from the start till the end of the year.

## Manual Builds

To build the output files, use the scripts in the root through the terminal. There are few scripts and each one with a different purpose.

:exclamation: `./clean-rebuild.sh <name of folder>` This will probably be the most used command. An argument must be passed that should reflect the folder of the project

:bulb: `./build.sh <name of folder>` To build the output folder with the required files to then produce the pdf.

:bomb: `./cleanup.sh <name of folder>` To destroy the output folder

## Automatic Builds

To avoid building everything manually on each change I am using a collection of tools that are well-integrated with my text editor:

- LaTeX Workshop
- LaTeX Utilities
- Zotero LaTeX
- Better BibTeX

LaTeX Workshop is probably the most important of all. It automatically builds and watches the output pdf file to have a nice hot-reload without closing and re-opening the file to see the changes in a very short delay time.

LaTeX Utilities is an addon for LaTeX Workshop that expands some functionalities such as Zotero citation integrations and smart paste formatter for the images.

Zotero does not only come in a form of a plugin, but also as Software for references and citations. This plugin will attach to the Zotero server and pull data from their endpoint to easily access the library.

Better BibTeX automates the export of the library and keeps it automatically updated on each change (addition, removal, or change). This will export a nice .bib file that can then be used in LaTeX.

### Paste Image Setting

In order to have a proper working template for the image paste on VSCode add the following to the setting schema

```
  "latex-utilities.formattedPaste.image.template": [
    "\\begin{figure}[ht]\n  \\centering\n  \\includegraphics[width=1\\textwidth]{figures/${imageFileNameWithoutExt}}\n  \\caption{${imageFileNameWithoutExt}}\n  \\label{f:${imageFileNameWithoutExt}}\n\\end{figure}"
  ]
```

### LaTeX Workshop Settings

Use the following settings for the output dir:
`%DIR%/output`

## Linting

A CI step will check for any linting errors and it can be found in the GitHub Action workflow.

## Editorconfig

To keep styling consistency, an editorconfig has been set up at the root of the repo.

## List of Projects

`dissertation` is the final year project

`network-security`

`penetration-testing`

`computer-forensics`

`advanced-networks`
