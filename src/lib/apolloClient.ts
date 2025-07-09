import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

// Reemplaza con tu endpoint de Hasura
const HASURA_GRAPHQL_ENDPOINT = 'https://wondrous-koala-47.hasura.app/v1/graphql'
const HASURA_WS_ENDPOINT = 'wss://wondrous-koala-47.hasura.app/v1/graphql'
const HASURA_ADMIN_SECRET = 'HaGbAAe4DfoSvY5WvtIu4VpJLawRnPYiQnjBYa2HVV5FoJzKHGLfSNhtDolnRFH5' // Opcional si no estás usando autenticación pública

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET, // o puedes usar token de sesión luego
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