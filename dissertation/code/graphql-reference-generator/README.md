# GraphQL Reference Generator

This reference generator takes a GraphQL schema and spits out a directory of
interlinked markdown files for traversing. The intention is to create an
exhaustive piece of documentation that can be used by those looking for a quick
reference to a specific API.

## Setup

To run the tool you will need a valid GraphQL schema file

## Running locally

1. `yarn install`
1. `yarn generate <path/to/schema> <path/to/output> <linksPrefix>`

If you do not supply a path to a schema, the package will look for a file named
`./schema.graphql`. Markdown will be generated into the path you specify,
otherwise it will output to a `__generated__` directory.

Adding a linksPrefix is optional, if you do not provide one the behaviour will
be that all links to other markdown pages will be relative. If one is provided
the links will be prefixed with the path provided.
