
import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Button} from 'react-native-elements';
import colors from "../../../config/colors"
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const TripList = ({ user }) => {
  const navigation = useNavigation()

  const newTrip = () => {
    navigation.navigate('NewTrip')
  }

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
            onPress={newTrip}>
              + new trip
            </Button>
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
  
export default TripList