import gql from 'graphql-tag';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import React from 'react';
import ReactDOM from 'react-dom';
import { resolvers, typeDefs } from './resolvers';

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn(client) {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages client={client} /> : <Login />;
}

const link = new HttpLink({
  uri: 'https://dev.dominikhaid.de/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYWNrZW5kTWFuYWdlciIsIm5hbWUiOiJEb21pbmlrIEhhaWQiLCJpYXQiOjY5NzQ1NzI5MzR9.MVumCHzp8CA97Qpz-YX_Vq55TilGGJ28GcLoU0mU0CA',
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(link),
  fetchOptions: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYWNrZW5kTWFuYWdlciIsIm5hbWUiOiJEb21pbmlrIEhhaWQiLCJpYXQiOjY5NzQ1NzI5MzR9.MVumCHzp8CA97Qpz-YX_Vq55TilGGJ28GcLoU0mU0CA',
    credentials: 'include',
  },
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYWNrZW5kTWFuYWdlciIsIm5hbWUiOiJEb21pbmlrIEhhaWQiLCJpYXQiOjY5NzQ1NzI5MzR9.MVumCHzp8CA97Qpz-YX_Vq55TilGGJ28GcLoU0mU0CA',
    credentials: 'include',
  },
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYWNrZW5kTWFuYWdlciIsIm5hbWUiOiJEb21pbmlrIEhhaWQiLCJpYXQiOjY5NzQ1NzI5MzR9.MVumCHzp8CA97Qpz-YX_Vq55TilGGJ28GcLoU0mU0CA',
        credentials: 'include',
      },
    });
  },
  typeDefs,
  resolvers,
  cache: cache,
});

cache.writeData({
  data: { isLoggedIn: !!localStorage.getItem('token'), cartItems: [] },
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
