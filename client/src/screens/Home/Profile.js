
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

import { UserContext } from '../../context';
import colors from "../../config/colors"
import TripList from './components/TripList'
import SuggestedPlaces from './components/SuggestedPlaces'



const Profile = ({ navigation }) => {
    const user = useContext(UserContext)

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
  