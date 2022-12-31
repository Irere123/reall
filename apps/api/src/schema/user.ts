import {
  objectType,
} from "nexus";


export const Account = objectType({
  name: "Account",
  isTypeOf(source) {
    return "email" in source;
  },
  definition(t) {
    t.string("username");
    t.string("email");
  },
});
