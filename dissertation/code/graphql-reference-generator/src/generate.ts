import run from "./run";

const schemaPath = process.argv.slice(2)[0];
const outputDirectory = process.argv.slice(2)[1];
const linksPrefix = process.argv.slice(2)[2];

run(schemaPath, outputDirectory, linksPrefix);
