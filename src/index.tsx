import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

import App from './components/App/App'

import './common/styles/index'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem('token') || null

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = authLink.concat(httpLink as any)

const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
