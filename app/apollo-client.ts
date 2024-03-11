import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_GRAPHQL, // URL del backend GraphQL
  cache: new InMemoryCache(),
});

export default client;
