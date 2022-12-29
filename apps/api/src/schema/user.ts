import {
  arg,
  enumType,
  intArg,
  interfaceType,
  objectType,
  queryType,
  stringArg,
  list,
} from "nexus";

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", { description: "Unique identifier for the resource" });
  },
});
export const Account = objectType({
  name: "Account",
  isTypeOf(source) {
    return "email" in source;
  },
  definition(t) {
    t.implements(Node); // or t.implements("Node")
    t.string("username");
    t.string("email");
  },
});
export const StatusEnum = enumType({
  name: "StatusEnum",
  members: ["ACTIVE", "DISABLED"],
});
export const Query = queryType({
  definition(t) {
    t.field("account", {
      type: Account, // or "Account"
      args: {
        name: stringArg(),
        status: arg({ type: "StatusEnum" }),
      },
    });
    t.field("accountsById", {
      type: list(Account), // or "Account"
      args: {
        ids: list(intArg()),
      },
    });
  },
});
