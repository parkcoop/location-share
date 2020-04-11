
import React from 'react';

import Profile from './Profile'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
const MyProfileStack = createStackNavigator();


const Dashboard = () => {

  const navigateTo = (navigator) => {
    return (screen) => {
      navigator.navigate(screen)
    }
  }

  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="Profile" 
        component={Profile} 
        options={{
          title: "Parker"
        }}
      />
    </MyProfileStack.Navigator>
  )
}

export default Dashboard;
  