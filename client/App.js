import React, {useReducer, useEffect} from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import Profile from './src/screens/Trips'
import Authentication from './src/screens/Authentication'
import { UserContext, AuthContext } from './src/context'

import FlashMessage from "react-native-flash-message";


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();


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
        <UserContext.Provider value={user}>
          <NavigationContainer>
            <RootStack.Navigator initialRouteName="Authentication">
              <RootStack.Screen 
                name="Authentication" 
                component={Authentication} 
                options={{
                  title: "Authentication",
                  headerShown: false,
                }}
              />
              <RootStack.Screen 
                name="Details" 
                component={Profile} 
                options={{
                  title: "Parker",
                  headerShown: false
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </AuthContext.Provider>
      <FlashMessage position="top" /> 
    </ApolloProvider>
  );
}
