"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const nexus_1 = require("nexus");
exports.Account = (0, nexus_1.objectType)({
    name: "Account",
    isTypeOf(source) {
        return "email" in source;
    },
    definition(t) {
        t.string("username");
        t.string("email");
    },
});
//# sourceMappingURL=user.js.map