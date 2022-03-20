import {
  GraphQLDirective,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  isEnumType,
  isInputType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from "graphql";
import {
  ENUMS,
  INPUTS,
  INTERFACES,
  MUTATIONS,
  OBJECTS,
  QUERIES,
  SCALARS,
  SUBSCRIPTIONS,
  UNIONS,
  DIRECTIVES,
} from "../constants";
import { formatItem } from "./formatItem";
import { GraphQLReferenceGroup } from "../types";

export function formatSchema(schema: GraphQLSchema) {
  return {
    ...Object.values(schema.getTypeMap())
      .filter((type) => !type.name.startsWith("__"))
      .reduce(typeReducer, initialItemData),
    directives: schema.getDirectives().map(formatItem),
  };
}

const initialItemData: GraphQLReferenceGroup = {
  [QUERIES]: [],
  [MUTATIONS]: [],
  [SUBSCRIPTIONS]: [],
  [OBJECTS]: [],
  [ENUMS]: [],
  [SCALARS]: [],
  [INTERFACES]: [],
  [UNIONS]: [],
  [INPUTS]: [],
  [DIRECTIVES]: [],
};

function typeReducer(
  acc: GraphQLReferenceGroup,
  type: GraphQLNamedType | GraphQLDirective
): GraphQLReferenceGroup {
  if (isObjectType(type)) {
    switch (type.name) {
      case "Query":
        return {
          ...acc,
          [QUERIES]: createRootObjectArray(type),
        };

      case "Mutation":
        return {
          ...acc,
          [MUTATIONS]: createRootObjectArray(type),
        };

      case "Subscription":
        return {
          ...acc,
          [SUBSCRIPTIONS]: createRootObjectArray(type),
        };

      default:
        return {
          ...acc,
          [OBJECTS]: [...acc[OBJECTS], formatItem(type)],
        };
    }
  }

  if (isEnumType(type)) {
    return {
      ...acc,
      [ENUMS]: [...acc[ENUMS], formatItem(type)],
    };
  }

  if (isScalarType(type)) {
    return {
      ...acc,
      [SCALARS]: [...acc[SCALARS], formatItem(type)],
    };
  }

  if (isInterfaceType(type)) {
    return {
      ...acc,
      [INTERFACES]: [...acc[INTERFACES], formatItem(type)],
    };
  }

  if (isUnionType(type)) {
    return {
      ...acc,
      [UNIONS]: [...acc[UNIONS], formatItem(type)],
    };
  }

  if (isInputType(type)) {
    return {
      ...acc,
      [INPUTS]: [...acc[INPUTS], formatItem(type)],
    };
  }

  return acc;
}

function createRootObjectArray(type: GraphQLObjectType) {
  return Object.values(type.getFields())
    .map(formatItem)
    .map((formattedType) => ({
      ...formattedType,
      isRootField: true,
    }));
}
