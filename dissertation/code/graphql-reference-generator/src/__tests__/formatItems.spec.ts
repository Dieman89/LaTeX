import { formatItem, printASTNode } from "../formatter/formatItem";
import {
  ASTNode,
  buildSchema,
  GraphQLDirective,
  GraphQLObjectType,
  isEnumType,
  isInputType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from "graphql";
import { GraphQLRawItem } from "../types";

describe("formatType Function tests", () => {
  it("should give a nice well formatted query object field", () => {
    const schema = buildSchema(`
      type Query {
        """This is a test description"""
        testQueryRoot(testArgument: String): String
      }
    `);
    const queryFields = (
      Object.values(schema.getTypeMap()).find(
        (type: { name: string }) => type.name === "Query"
      )! as GraphQLObjectType
    ).getFields();
    const queryField = Object.values(queryFields)[0] as GraphQLRawItem;

    const output = formatItem(queryField);

    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted mutation object field", () => {
    const schema = buildSchema(`
      type Mutation {
        """Test mutation description"""
        testMutation(testMutationArgument: TestInput): String
      }

      input TestInput {
        id: String
      }
    `);
    const queryItems = (
      Object.values(schema.getTypeMap()).find(
        (type: { name: string }) => type.name === "Mutation"
      )! as GraphQLObjectType
    ).getFields();
    const queryField = Object.values(queryItems)[0] as GraphQLRawItem;
    console.log(queryField);

    const output = formatItem(queryField);
    console.log(output);
    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted subscription object field", () => {
    const schema = buildSchema(`
      type Subscription {
        """Test subscription description"""
        testSubscription(testSubscriptionArgument: TestInput): String
      }

      input TestInput {
        id: String
      }
    `);
    const queryItems = (
      Object.values(schema.getTypeMap()).find(
        (type: { name: string }) => type.name === "Subscription"
      )! as GraphQLObjectType
    ).getFields();
    const queryField = Object.values(queryItems)[0]! as GraphQLRawItem;

    const output = formatItem(queryField);

    expect(output).toMatchSnapshot();
  });

  it("should provide the correct format from a GraphQL object type", () => {
    const schema = buildSchema(`
      type TestObject {
        aString: String
        aNonNullString: String!
        aNumber: Int
        aNestedType: TestNestedType!
      }

      type TestNestedType {
        anotherString: String
      }
    `);
    const objectToTest = Object.values(schema.getTypeMap()).find(
      (type) => isObjectType(type) && type.name === "TestObject"
    )!;

    const output = formatItem(objectToTest);

    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted enum object", () => {
    const schema = buildSchema(`enum TestEnum { TEST1 TEST2 TEST3 }`);
    const enumToTest = Object.values(schema.getTypeMap()).find(
      (type: { name: string }) => isEnumType(type) && type.name === "TestEnum"
    )!;

    const output = formatItem(enumToTest);

    expect(output).toMatchSnapshot();
  });

  it("should provide the correct format from a GraphQL scalar type", () => {
    const schema = buildSchema(`
      scalar TestScalar
    `);
    const scalarToTest = Object.values(schema.getTypeMap()).find(
      (type) => isScalarType(type) && type.name === "TestScalar"
    )!;

    const output = formatItem(scalarToTest);

    expect(output).toMatchSnapshot();
  });

  it("should provide the correct format from a GraphQL union type", () => {
    const schema = buildSchema(`
      union TestUnion = String | Int
    `);
    const unionToTest = Object.values(schema.getTypeMap()).find(
      (type) => isUnionType(type) && type.name === "TestUnion"
    )!;

    const output = formatItem(unionToTest);

    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted interface object", () => {
    const schema = buildSchema(`
      interface TestInterface { test: String }
    `);
    const interfaceToTest = Object.values(schema.getTypeMap()).find(
      (type: { name: string }) =>
        isInterfaceType(type) && type.name === "TestInterface"
    )!;

    const output = formatItem(interfaceToTest);

    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted input object", () => {
    const schema = buildSchema(`
      input TestInput { test: String }
    `);
    const inputToTest = Object.values(schema.getTypeMap()).find(
      (type: { name: string }) => isInputType(type) && type.name === "TestInput"
    )!;

    const output = formatItem(inputToTest);

    expect(output).toMatchSnapshot();
  });

  it("should give a nice well formatted directive object", () => {
    const schema = buildSchema(`
      directive @testDirective(
        testArg: String = "Test argument"
      ) on FIELD_DEFINITION
    `);
    const directiveToTest = Object.values(schema.getDirectives()).find(
      (type: GraphQLDirective) => type.name === "testDirective"
    )!;

    const output = formatItem(directiveToTest);

    expect(output).toMatchSnapshot();
  });

  it("should remove all the comments from a printed node", () => {
    const schema = buildSchema(`
      """Interface Comment"""
      interface TestInterface {
        """Interface Field Comment"""
        test: String
      }
    `);
    const interfaceObject = Object.values(schema.getTypeMap()).find(
      isInterfaceType
    )!;

    const output = printASTNode(interfaceObject.astNode! as ASTNode);

    expect(output).not.toMatch(/"""([\s\S]*?)"""\n/);
  });

  it("should provide the type for arguments or fields", () => {
    const schema = buildSchema(`
      type Query {
        testField(testArgument: TestObject): TestObject
      }

      type TestObject {
        testField: String
      }
    `);
    const typeMap = Object.values(schema.getTypeMap());
    const queryFields = (
      typeMap.find(
        (type: { name: string }) => type.name === "Query"
      )! as GraphQLObjectType
    ).getFields();
    const queryFieldToTest = Object.values(queryFields)[0] as GraphQLRawItem;

    const output = formatItem(queryFieldToTest);

    expect(output.type).toEqual("TestObject");
  });

  it("should not provide the type named types", () => {
    const schema = buildSchema(`
      type TestObject {
        testField: String
      }
    `);
    const typeMap = Object.values(schema.getTypeMap());
    const objectToTest = typeMap.find(
      (type) => isObjectType(type) && type.name === "TestObject"
    )!;

    const output = formatItem(objectToTest);

    expect(output.type).toBeNull();
  });
});
