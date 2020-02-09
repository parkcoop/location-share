import { UserContext } from '../../context';

import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../../config/strings';
import { Button, Avatar } from 'react-native-elements';
import colors from "../../config/colors"
import moment from 'moment';
import Profile from './Profile'
import NewTrip from './NewTrip'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const MyTripStack = createStackNavigator();


const Trips = ({ navigation }) => {
    return (
      <MyTripStack.Navigator>
        <MyTripStack.Screen
          name="Profile" 
          component={Profile} 
          options={{
            title: "Parker"
          }}
        />
        <MyTripStack.Screen
          name="NewTrip" 
          component={NewTrip} 
          options={{
            title: "Lol"
          }}
        />
      </MyTripStack.Navigator>
        )
}

export default Trips;
  