import { buildSchema } from "graphql";
import { formatSchema } from "../formatter/formatSchema";

describe("formatSchema", () => {
  it("takes a GraphQLSchema and produces a correctly formatted object", () => {
    const schema = buildSchema(`
      schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
      }

      """
      This is a query type
      """
      type Query {
        """
        Test query field description
        """
        testQueryField(testArgument: ID!): TestObject
      }

      """
      Test mutation description
      """
      type Mutation {
        """
        Test mutation field description
        """
        testMutationField(testInput: TestInput): TestObject
      }

      """
      Test subscription description
      """
      type Subscription {
        """
        Test subscription field description
        """
        testSubscription(testArgument: String): TestObject
      }

      """
      Test input description
      """
      input TestInput {
        """
        Test input field description
        """
        id: String
      }

      """
      Test object type description
      """
      type TestObject {
        """
        Test id field description
        """
        testObjectField: String!
      }

      enum TestEnum {
        TEST1
        TEST2
      }

      scalar TestScalar

      interface TestInterface {
        id: String
      }

      union TestUnion = String | Int
    `);

    const output = formatSchema(schema);

    expect(output).toMatchSnapshot();
  });
});
