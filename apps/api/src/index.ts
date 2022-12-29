import * as express from "express";
import { makeSchema } from "nexus";
import { ApolloServer } from "apollo-server-express";

import * as allTypes from "./schema";

const main = async () => {
  const app = express();

  const apollo = new ApolloServer({
    schema: makeSchema({
      types: allTypes,
    }),
  });

  await apollo.start();
  apollo.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`);
  });
};

main();
