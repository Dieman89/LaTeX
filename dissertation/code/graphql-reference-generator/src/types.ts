import {
  GraphQLNamedType,
  GraphQLArgument,
  GraphQLField,
  GraphQLDirective,
} from "graphql";
import {
  DIRECTIVES,
  ENUMS,
  INPUTS,
  INTERFACES,
  MUTATIONS,
  OBJECTS,
  QUERIES,
  SCALARS,
  SUBSCRIPTIONS,
  UNIONS,
} from "./constants";

// can be any type that is defined in the schema or a component of those types (eg. a field or an argument)
export type GraphQLItem = {
  name: string; // could be the name of the type or an alias if it's a field or argument
  description: string; // the description of the item from the schema file
  type: string | null; // name of the item type if it is not a type itself
  printed: string | null; // a string showing the item in GraphQL schema format
  arguments: Array<GraphQLItem>; // any arguments that the item takes
  fields: Array<GraphQLItem>; // any fields on the item
  path: string | null; // the path to reach the type in the GraphQLItemData
  isRootField?: boolean; // `true` if the item is a field of 'Query', 'Mutation' or 'Subscription' types
  directives: Array<GraphQLDirectiveItem>;
};

export type GraphQLDirectiveItem = Pick<GraphQLItem, "path" | "name">;

export type GraphQLRawItem =
  | GraphQLNamedType
  | GraphQLArgument
  | GraphQLDirective
  | GraphQLField<any, any, any>;

export type ReferenceKeys =
  | typeof QUERIES
  | typeof MUTATIONS
  | typeof SUBSCRIPTIONS
  | typeof OBJECTS
  | typeof ENUMS
  | typeof SCALARS
  | typeof INTERFACES
  | typeof UNIONS
  | typeof INPUTS
  | typeof DIRECTIVES;

export type GraphQLReferenceGroup = {
  [key in ReferenceKeys]: Array<GraphQLItem>;
};
