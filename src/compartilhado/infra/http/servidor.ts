import 'reflect-metadata';

import '@compartilhado/infra/typeorm';
import '@compartilhado/recipiente';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ContaRes } from '../../../resolvedores/ContaRes';

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ContaRes],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('express server started');
  });
})();
