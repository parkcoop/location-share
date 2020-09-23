import React, { useState, useReducer } from 'react';
import AppRouter from "./AppRouter";
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UserContext, AuthContext } from './context'
import Authentication from './screens/Authentication'
import 'typeface-roboto';
import { StylesProvider } from '@material-ui/styles';

const client = new ApolloClient(
  {
    link: createUploadLink({
      uri: 'http://127.0.0.1:4000/graphql',
    }),
    headers: {
      authorization: ''
    },
    cache: new InMemoryCache()
  })


export default function App() {
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // debugger;

  const [user, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOGIN':
          // debugger;
          // notify("message", 'nice');

          return action.user
        case 'LOGOUT':
          window.location.href = "/"
          return {}
      }
    }
  );
  // const notify = (type, message) => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  // };

  // const handleCloseAlert = () => {
  //   setAlertMessage("");
  // };


  return (
    <StylesProvider injectFirst>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={dispatch}>
          <UserContext.Provider value={user}>
            <AppRouter />
          </UserContext.Provider>
        </AuthContext.Provider>

      </ApolloProvider>
    </StylesProvider>

  );
}