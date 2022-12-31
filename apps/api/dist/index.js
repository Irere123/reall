"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const nexus_1 = require("nexus");
const apollo_server_express_1 = require("apollo-server-express");
const allTypes = require("./schema");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: (0, nexus_1.makeSchema)({
            types: allTypes,
        }),
    });
    yield apollo.start();
    apollo.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`);
    });
});
main();
//# sourceMappingURL=index.js.map