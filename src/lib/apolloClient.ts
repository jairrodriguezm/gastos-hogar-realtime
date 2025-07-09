import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;
const HASURA_ADMIN_SECRET = import.meta.env.VITE_HASURA_ADMIN_SECRET;

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET, 
  },
})

const wsLink = new GraphQLWsLink(createClient({
  url: HASURA_WS_ENDPOINT,
  connectionParams: {
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
  },
}))

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === 'OperationDefinition' &&
      def.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})