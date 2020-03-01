
import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Button} from 'react-native-elements';
import colors from "../../../config/colors"
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import trips from '../../../utils'

const TripList = ({ user }) => {
  const navigation = useNavigation()
  // const [tripList, loadTripList] = useState([]);


  const newTrip = () => {
    navigation.navigate('NewTrip')
  }
  
  const { data, error, loading } = useQuery(trips.GET_TRIPS, 
    { variables: { userId: user.id },
  })
  if (loading) {
    return <Text>Loading</Text>
  }
if (data) {

  return (
    
      <View style={styles.myTrips}>
          <Text style={styles.text}>
              My Trips
          </Text>
            <FlatList
              style={styles.list}
              data={data.trips}
              renderItem={({item}) => <Text style={styles.item}>{moment().utc(item.startDate).format('MM.DD')} | {item.name}</Text>}
            />
          <Button title="New trip"
          onPress={newTrip}>
            + new trip
          </Button>
      </View>
  )
}
  
  

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
    height: 'fit-content',
    width: '100%'
  },
  item: {
    fontSize: 20
  },
  newTrip: {
    marginLeft: 10
  }
})
  
export default TripList