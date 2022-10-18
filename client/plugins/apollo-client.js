import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
  uri: process.env.graphServerUrl,
  cache: new InMemoryCache()
})
