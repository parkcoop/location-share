import { UserContext } from '../../context';

import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../../config/strings';
import { Button, Avatar, Tile } from 'react-native-elements';
import colors from "../../config/colors"
import moment from 'moment';

import 'react-native-gesture-handler';


const Profile = ({ navigation }) => {
    const user = useContext(UserContext)

    const loadTrips = () => {
      navigation.navigate('NewTrip')
    }



    const ProfileModal = ({ user }) => {
      console.log('in profile', user)
        return (
            <View style={styles.myProfile}>
                <Avatar
                    rounded
                    size="large"
                    containerStyle={styles.avatar}
                    showEditButton
                    source={{
                      uri: user.avatar
                    }}
                />
                <Text style={styles.text}>
                    {user.fullName}
                </Text>
            </View>
        )
    }


    const TripList = ({ user }) => {
        return (
            <View style={styles.myTrips}>
                <Text style={styles.text}>
                    My Trips
                </Text>
                <View>
                  <FlatList
                    style={styles.list}
                    data={[
                      {
                        key: 'Tokyo, Seoul',
                        date: moment('04/20/2020').format('MM.YY')
                      },
                      {
                        key: 'San Francisco, Las Vegas, Seattle',
                        date: moment('09/29/2020').format('MM.YY')
                      }
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.date} | {item.key}</Text>}
                  />
                </View>
                <Button title="New trip"
                onPress={loadTrips}>
                  + new trip
                </Button>
            </View>
        )
    }

    const SuggestedPlaces = ({ user }) => {
        return (
            <View style={styles.myTrips}>
                <Text style={styles.text}>
                    Suggested Places
                </Text>
                <View>
                  <Tile 
                    imageContainerStyle={{width: 30, alignSelf: 'center'}}
                  />
                </View>
                <Button title="New trip"
                onPress={loadTrips}>
                  + new trip
                </Button>
            </View>
        )
    }

    return (
    <View>
      <ProfileModal 
        user={user}
      />
      <TripList 
        user={user}
      />
      <SuggestedPlaces
        user={user} 
      />
    </View>
    )
}

const styles = StyleSheet.create({
    myProfile: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
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
      height: 300,
      width: '90%',
      alignSelf: 'center',
      margin: 10,
      padding: 10
    },
    suggestedTrips: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      height: 300,
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
    

export default Profile;
  