import { createPathToItem } from "../formatter/createPath";
import {
  buildSchema,
  isEnumType,
  isInputType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from "graphql";

const schema = buildSchema(`
type TestObject {
  testField: String @TestDirective
}
input TestInput {
  testInputField: Int
}
enum TestEnum {
  TEST1
  TEST2
  TEST3
}
union TestUnion = TestObject | TestInput
scalar TestScalar
interface TestInterface {
  testInterfaceField: String
}
directive @TestDirective on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
`);

const scalarItem = Object.values(schema.getTypeMap()).find(
  (type) => isScalarType(type) && type.name === "TestScalar"
)!;
const inputItem = Object.values(schema.getTypeMap()).find(
  (type) => isInputType(type) && type.name === "TestInput"
)!;
const enumItem = Object.values(schema.getTypeMap()).find(isEnumType)!;
const unionItem = Object.values(schema.getTypeMap()).find(isUnionType)!;
const interfaceItem = Object.values(schema.getTypeMap()).find(isInterfaceType)!;
const objectItem = Object.values(schema.getTypeMap()).find(isObjectType)!;
const directiveItem = Object.values(schema.getTypeMap())
  .find(isObjectType)!
  .getFields()!.testField!.astNode!.directives![0];

describe("createPathToItem", () => {
  it("should return a path to the scalar item when passed a scalar type", () => {
    const scalarPath = createPathToItem(scalarItem);
    expect(scalarPath).toEqual(`/scalars/test-scalar`);
  });
  it("should return a path to the input item when passed a input type", () => {
    const inputPath = createPathToItem(inputItem);
    expect(inputPath).toEqual(`/inputs/test-input`);
  });

  it("should return a path to the object item when passed a object type", () => {
    const objectPath = createPathToItem(objectItem);
    expect(objectPath).toEqual(`/objects/test-object`);
  });

  it("should return a path to the enum items when passed a enum type", () => {
    const enumPath = createPathToItem(enumItem);
    expect(enumPath).toEqual(`/enums/test-enum`);
  });

  it("should return a path to the interface items when passed a interface type", () => {
    const interfacePath = createPathToItem(interfaceItem);
    expect(interfacePath).toEqual(`/interfaces/test-interface`);
  });

  it("should return a path to the union items when passed a union type", () => {
    const unionPath = createPathToItem(unionItem);
    expect(unionPath).toEqual(`/unions/test-union`);
  });

  it("should return a path to the directive items when passed a directive type", () => {
    const directivePath = createPathToItem(directiveItem);
    expect(directivePath).toEqual(`/directives/test-directive`);
  });
});
