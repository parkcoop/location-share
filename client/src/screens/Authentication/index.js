import { UserContext } from '../../context';

import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../../config/strings';
import { Button, Avatar } from 'react-native-elements';
import colors from "../../config/colors"
import moment from 'moment';
import Login from './Login'
import Register from './Register'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const AuthStack = createStackNavigator();


const Authentication = ({ navigation }) => {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login" 
          component={Login} 
          options={{
            title: "Login"
          }}
        />
        <AuthStack.Screen
          name="Register" 
          component={Register} 
          options={{
            title: "Register"
          }}
        />
      </AuthStack.Navigator>
        )
}

const styles = StyleSheet.create({
    myProfile: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
      width: '90%',
      alignSelf: 'center',
      margin: 10

    },
    myTrips: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      height: 400,
      width: '90%',
      alignSelf: 'center',
      margin: 10,
      padding: 10
    },
    avatar: {
      margin: 10
    },
    text: {
      fontSize: 30,
      color: colors.NAVY
    },
    list: {
      marginTop: 10,
      marginLeft: 10,
      height: 50
    },
    newTrip: {
      marginLeft: 10
    }
  })
    

export default Authentication;
  