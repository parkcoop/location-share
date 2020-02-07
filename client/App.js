import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import Users from './src/screens/Users'
import Login from './src/screens/Authentication/Login'
import MyTrips from './src/screens/Trips'
import Authentication from './src/screens/Authentication'
import { UserContext } from './src/context'


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


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

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  

  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

export default function App() {
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{token:'', username: ''}}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Authentication">
            <Stack.Screen 
              name="Home" 
              component={Login} 
              options={{
                title: "Parker"
              }}
            />
            <Stack.Screen 
              name="Authentication" 
              component={Authentication} 
              options={{
                title: "Authentication"
              }}
            />
            <Stack.Screen 
              name="Details" 
              component={MyTrips} 
              options={{
                title: "Parker"
              }}
            />
          </Stack.Navigator>
          {/* <View>
            <Users></Users>
            <Login></Login>
            <Text>Hello</Text>
          </View> */}
        </NavigationContainer>
      </UserContext.Provider>
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
