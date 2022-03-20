const {
  print,
  isInterfaceType,
  buildSchema,
  isObjectType,
  isEnumType,
  isScalarType,
  isUnionType,
  isInputType,
  isListType,
  isNonNullType,
} = require("graphql");
const fs = require("fs");
const Handlebars = require("handlebars");

const createPath = (type) => {
  if (isListType(type) || isNonNullType(type)) {
    return createPath(type.ofType);
  }
  if (isScalarType(type)) {
    return `/scalars/${type.name}`;
  }
  if (isObjectType(type)) {
    return `/objects/${type.name}`;
  }
  if (isEnumType(type)) {
    return `/enums/${type.name}`;
  }
  if (isInterfaceType(type)) {
    return `/interfaces/${type.name}`;
  }
  if (isUnionType(type)) {
    return `/unions/${type.name}`;
  }
  if (isInputType(type)) {
    return `/inputs/${type.name}`;
  }
  return "";
};

const schemaFile = fs.readFileSync("schema.graphql").toString();
const formatType = (type) => {
  return {
    name: type.name,
    description: type.description,
    type: type.type,
    printed: printASTNode(type.astNode),
    arguments: type.args,
    fields: type.getFields
      ? Object.values(type.getFields()).map(formatType)
      : [],
    path: createPath(type.type) ? createPath(type.type).toLowerCase() : null,
  };
};

const printASTNode = (astNode) =>
  astNode
    ? print(astNode)
        .replace(/"""([\s\S]*?)"""/, "")
        .trim()
    : null;

const builtSchema = buildSchema(schemaFile);
const groupedTypes = Object.values(builtSchema.getTypeMap())
  .filter((type) => !type.name.startsWith("__"))
  .reduce(
    (acc, type) => {
      if (isObjectType(type)) {
        if (type.name === "Query") {
          return {
            ...acc,
            queries: Object.values(type.getFields())
              .map(formatType)
              .map((formattedType) => ({
                ...formattedType,
                isRootType: true,
              })),
          };
        }

        if (type.name === "Mutation") {
          return {
            ...acc,
            mutations: Object.values(type.getFields())
              .map(formatType)
              .map((formattedType) => ({
                ...formattedType,
                isRootType: true,
              })),
          };
        }

        if (type.name === "Subscription") {
          return {
            ...acc,
            subscriptions: Object.values(type.getFields())
              .map(formatType)
              .map((formattedType) => ({
                ...formattedType,
                isRootType: true,
              })),
          };
        }

        return {
          ...acc,
          objects: [...acc.objects, formatType(type)],
        };
      }

      if (isEnumType(type)) {
        return {
          ...acc,
          enums: [...acc.enums, formatType(type)],
        };
      }

      if (isScalarType(type)) {
        return {
          ...acc,
          scalars: [...acc.scalars, formatType(type)],
        };
      }

      if (isInterfaceType(type)) {
        return {
          ...acc,
          interfaces: [...acc.interfaces, formatType(type)],
        };
      }

      if (isUnionType(type)) {
        return {
          ...acc,
          unions: [...acc.unions, formatType(type)],
        };
      }

      if (isInputType(type)) {
        return {
          ...acc,
          inputs: [...acc.inputs, formatType(type)],
        };
      }

      // TODO: Directives
      return acc;
    },
    {
      queries: [],
      mutations: [],
      subscriptions: [],
      objects: [],
      enums: [],
      scalars: [],
      interfaces: [],
      unions: [],
      inputs: [],
      directives: [],
    }
  );

console.log(groupedTypes);

const queryTemplate = Handlebars.compile(
  fs.readFileSync("template.hbs").toString()
);

if (!fs.existsSync("output/")) {
  fs.mkdirSync("output/", { recursive: true });
} else {
  fs.rmSync("output/", { recursive: true });
  fs.mkdirSync("output/", { recursive: true });
}

Object.keys(groupedTypes).forEach((group) => {
  fs.mkdirSync(`output/${group}`, { recursive: true });

  groupedTypes[group].forEach((type) => {
    fs.writeFileSync(`output/${group}/${type.name}.md`, queryTemplate(type));
  });
});
