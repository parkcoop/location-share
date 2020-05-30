import React, { useReducer } from 'react';
import AppRouter from "./AppRouter";
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UserContext, AuthContext } from './context'
import Authentication from './screens/Authentication'

const client = new ApolloClient(
  {
    link: createHttpLink({
      uri: 'http://127.0.0.1:4000',
    }),
    headers: {
      authorization: ''
    },
    cache: new InMemoryCache()
  })


export default function App() {

  
  const [user, dispatch] = useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'LOGIN':
          return action.user
        case 'LOGOUT':
          return {}
      }
    }
  );



  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={dispatch}>
        <div>
          <AppRouter/>

        </div>
        <UserContext.Provider value={user}>
        </UserContext.Provider>
      </AuthContext.Provider>

    </ApolloProvider>

  );
}