import { buildSchema } from "graphql";
import { createMarkdownContent } from "./markdown/createMarkdownContent";
import { GraphQLReferenceGroup, ReferenceKeys } from "./types";
import fs from "fs";
import { formatSchema } from "./formatter/formatSchema";
import { promisify } from "util";
import { toKebabCase } from "./utils/toKebabCase";

const writeFilePromise = promisify(fs.writeFile);

export default function run(
  schemaFilePath = "./schema.graphql",
  outputDirectory = "./__generated__/",
  linksPrefix = ".."
) {
  const schema = buildSchema(fs.readFileSync(schemaFilePath).toString());

  const formattedSchema = formatSchema(schema);

  setupRootDir(outputDirectory);

  Promise.all(
    (Object.keys(formattedSchema) as Array<ReferenceKeys>).map(
      makeMarkdownFn(formattedSchema, linksPrefix, outputDirectory)
    )
  ).then(() => {
    console.log("Finished creating markdown");
  });
}

function setupRootDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

function makeMarkdownFn(
  formattedSchema: GraphQLReferenceGroup,
  linksPrefix: string,
  outputDirectory: string
) {
  return function makeMarkdownFiles(key: ReferenceKeys) {
    const dirPath = `${outputDirectory}/${key}`;
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, { recursive: true });
    }

    if (formattedSchema[key].length < 1) {
      return [new Promise(() => console.log(`No folder created for ${key}`))];
    }

    fs.mkdirSync(dirPath);
    return formattedSchema[key].map(function makeMarkdownFile(item) {
      return writeFilePromise(
        `${dirPath}/${toKebabCase(item.name)}.mdx`,
        createMarkdownContent(item, linksPrefix)
      );
    });
  };
}
