import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/apolloClient'
import { registerSW } from 'virtual:pwa-register'
import { UiProvider } from './contexts/UiContext'

import './styles/global.scss';

registerSW();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <UiProvider>
        <App />
      </UiProvider>
    </ApolloProvider>
  </React.StrictMode>
)
