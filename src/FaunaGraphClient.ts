import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { Client } from 'faunadb'
import fetch from 'node-fetch'

const URL = "https://graphql.fauna.com/graphql";
const httpLink = new HttpLink({
  uri: URL,
  fetch:fetch as any,
  headers: {
    Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
  },
});
export const FaunaGraphClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const FaunaDbClient = new Client({ 
  secret: process.env.FAUNADB_SERVER_SECRET as string,
});
