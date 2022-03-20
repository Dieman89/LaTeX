import {
  isInterfaceType,
  isObjectType,
  isEnumType,
  isScalarType,
  isUnionType,
  isInputType,
  isListType,
  isNonNullType,
  GraphQLType,
  DirectiveNode,
} from "graphql";
import {
  DIRECTIVES,
  ENUMS,
  INPUTS,
  INTERFACES,
  OBJECTS,
  SCALARS,
  UNIONS,
} from "../constants";
import { toKebabCase } from "../utils/toKebabCase";

export const createPathToItem = (type: GraphQLType | DirectiveNode): string => {
  if (isListType(type) || isNonNullType(type)) {
    return createPathToItem(type.ofType);
  }
  if (isScalarType(type)) {
    return `/${SCALARS}/${toKebabCase(type.name)}`;
  }
  if (isObjectType(type)) {
    return `/${OBJECTS}/${toKebabCase(type.name)}`;
  }
  if (isEnumType(type)) {
    return `/${ENUMS}/${toKebabCase(type.name)}`;
  }
  if (isInterfaceType(type)) {
    return `/${INTERFACES}/${toKebabCase(type.name)}`;
  }
  if (isUnionType(type)) {
    return `/${UNIONS}/${toKebabCase(type.name)}`;
  }
  if (isInputType(type)) {
    return `/${INPUTS}/${toKebabCase(type.name)}`;
  }
  return `/${DIRECTIVES}/${toKebabCase(type.name.value)}`;
};
