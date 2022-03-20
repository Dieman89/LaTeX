import { GraphQLDirectiveItem, GraphQLItem, GraphQLRawItem } from "../types";
import {
  GraphQLArgument,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  print,
  ASTNode,
  DirectiveNode,
  GraphQLDirective,
} from "graphql";
import { createPathToItem } from "./createPath";

export const formatItem = (graphqlType: GraphQLRawItem): GraphQLItem => {
  return {
    name: graphqlType.name,
    description: graphqlType.description || "",
    type: hasType(graphqlType) ? graphqlType.type.toString() : null,
    printed: printASTNode(graphqlType.astNode as ASTNode),
    arguments: hasArgs(graphqlType)
      ? Object.values(graphqlType.args).map(formatItem)
      : [],
    fields: hasFields(graphqlType)
      ? Object.values(graphqlType.getFields()).map(formatItem)
      : [],
    path: hasType(graphqlType)
      ? createPathToItem(graphqlType.type).toLowerCase()
      : null,
    directives: hasDirectives(graphqlType)
      ? createDirectives(graphqlType.astNode.directives)
      : [],
  };
};

export function printASTNode(astNode: ASTNode) {
  const pattern = new RegExp(/"""([\s\S]*?)"""\n/, "g");
  return astNode
    ? print(astNode).replace(pattern, "").trim().replace(/^ +/gm, "")
    : null;
}

export function createDirectives(
  nodes: Array<DirectiveNode>
): Array<GraphQLDirectiveItem> {
  return nodes.map((item: DirectiveNode) => {
    return {
      name: item.name.value,
      path: createPathToItem(item),
    };
  });
}

function hasType(
  type: any
): type is GraphQLArgument | GraphQLField<any, any, any> {
  return !!type.type;
}

function hasArgs(
  type: any
): type is GraphQLField<any, any, any> | GraphQLDirective {
  return !!type.args;
}

function hasFields(
  type: any
): type is GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType {
  return !!type.getFields;
}

function hasDirectives(
  type: any
): type is { astNode: { directives: DirectiveNode[] } } {
  return !!(type.astNode?.directives?.length > 0);
}
