import React from 'react';
import ReactDOM from 'react-dom';

// Routes
import Layout from './components/layout';

// Redux
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

// Apollo Graphql
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, withApollo } from 'react-apollo';

import { SERVER_API } from './constants/BaseConfig';

// REDUX
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// APOLLO GRAPHQL
const httpLink = new HttpLink({ uri: SERVER_API, credentials: 'include' });

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GRAPHQL ERROR]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.error(`[ERROR: NETWORK ERROR]: ${networkError}`);
});

// AUTH MIDDLEWARE
const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, logoutLink, httpLink]),
  //link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const LayoutHooked = withApollo(Layout);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store} client={client}>
      <LayoutHooked />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
