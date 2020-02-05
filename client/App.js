import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import Users from './src/screens/Users'
import Login from './src/screens/Login'

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
  return (
    <ApolloProvider client={client}>
      <View>
        <Users></Users>
        <Login></Login>
        <Text>Hello</Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  new: {
    backgroundColor: 'black',
    height: '50px',
    width: '100%'
  },
  text: {
    color: 'white',

  }

});
