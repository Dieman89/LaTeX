import { GraphQLDirectiveItem, GraphQLItem } from "../types";
import prettier from "prettier";
import { toKebabCase } from "../utils/toKebabCase";

export function createMarkdownContent(item: GraphQLItem, linksPrefix: string) {
  return prettier.format(createTemplate(item, linksPrefix), {
    parser: "mdx",
  });
}

function createTemplate(item: GraphQLItem, linksPrefix: string) {
  const addLinkPrefix = createPathPrefixer(linksPrefix);
  return `
---
id: ${toKebabCase(item.name)}
title: ${item.name}
hide_title: true
---

# ${item.name}

${item.description ? `${item.description}` : ""}

${makeCodeblockSection(item.printed)}

${makeItemsSection(
  "Arguments",
  item.arguments.map(addLinkPrefix),
  createItemLink
)}

${makeItemsSection("Fields", item.fields.map(addLinkPrefix), createItemLink)}

${makeItemsSection(
  "Directives",
  item.directives.map(addLinkPrefix),
  createDirectiveLink
)}

${
  item.isRootField
    ? makeItemsSection("Type", [addLinkPrefix(item)], createTypeLink)
    : ""
}
  `;
}

function createPathPrefixer(linkPrefix: string) {
  return (item: GraphQLItem | GraphQLDirectiveItem) => ({
    ...item,
    path: item.path ? linkPrefix.concat(item.path) : item.path,
  });
}

function makeCodeblockSection(item: string | null) {
  return item ? `\`\`\`graphql \n${item ? `${item}` : ""}\n\`\`\`` : "";
}

function makeItemsSection(
  title: string,
  items: Array<GraphQLItem | GraphQLDirectiveItem>,
  eachItemFn: any
) {
  if (items.length < 1) {
    return "";
  }

  return `### ${title}
${items.map(eachItemFn).join("\n")}`;
}

function createItemLink({ name, type, path, description }: GraphQLItem) {
  return `\`${name}\` ([\`${type}\`](${path}))${
    description ? `: ${description}` : ``
  }\n`;
}

function createTypeLink({ type, path }: GraphQLItem) {
  return `[\`${type}\`](${path})\n`;
}

function createDirectiveLink({ name, path }: GraphQLDirectiveItem) {
  return `[${name}](${path})`;
}
