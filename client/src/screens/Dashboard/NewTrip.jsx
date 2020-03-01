
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormTextInput, Button } from "../../components/elements";
import 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import notify from '../../utils'

import strings from '../../config/strings';
import colors from "../../config/colors"
import gql from 'graphql-tag';
import { UserContext } from '../../context';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


import trips from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';

// const ADD_TRIP = gql`
//     mutation AddTrip( $startDate: Int!, $endDate: Int, $locations: [String!]!, $name: String!, $description: String!, $creator: ID!) {
//         addTrip(startDate: $startDate, endDate: $endDate, locations: $locations, name: $name, description: $description, creator: $creator) {
//             message
//             code    
//         }
//     }   
// `;


const NewTrip = ({ navigation }) => {
    const user = useContext(UserContext)
    
   
    const [addTrip, { loading }] = useMutation(trips.ADD_TRIP)
    
    const [trip, setTrip] = useState({});
    
    const handleInput = (evt) => {
        trip[evt.target.name] = evt.target.value
        setTrip({
            ...trip
        })
        console.log(trip)
    }

    const submitTrip = async () => {
        let { name, description, startDate, endDate, locations } = trip;
        if (!name || !description || !startDate || !endDate || !locations) {
            notify.error("ADD_TRIP", "Check fields")
            return;
        }

        try {
            const { data } = await addTrip({variables: {
                ...trip,
                startDate: parseInt(trip.startDate),
                endDate: parseInt(trip.endDate),
                creator: user.id,
                locations: trip.locations.split(',')
            }})
    
            console.log(data)
            if (data.addTrip?.code === 200) {
                notify.success('ADD_TRIP', "nice")
                navigation.navigate('Profile')
            } else {
                notify.error('ADD_TRIP', data.addTrip?.message)

            }
        }
        catch(error) {
            notify.error('ADD_TRIP', error.message)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>
                    New Trip
                </Text>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={textStyles.heading}>
                            Title
                        </Text>
                    </View>
                    <View>
                        <FormTextInput 
                            style={formStyles.full}
                            placeholder="Name of trip"
                            onChange={handleInput}
                            name="name"
                        />
                    </View>
                    <View>
                        <Text style={textStyles.heading}>
                          description?
                        </Text>
                    </View>
                    <View>
                        <FormTextInput 
                            style={formStyles.full}
                            placeholder={strings.LOCATION_SEARCH_PLACEHOLDER}
                            onChange={handleInput}
                            name="description"
                        />
                    </View>
                    <View>
                        <Text style={textStyles.heading}>
                            where to?
                        </Text>
                    </View>
                    <View>
                        <FormTextInput 
                            style={formStyles.full}
                            placeholder={strings.LOCATION_SEARCH_PLACEHOLDER}
                            onChange={handleInput}
                            name="locations"
                        />
                    </View>
                    <View style={formStyles.doubleContainer}>
                        <FormTextInput 
                            style={formStyles.half}
                            onChange={handleInput}
                            name="startDate"
                            type="number"
                        />
                        <FormTextInput 
                            style={formStyles.half}
                            name="endDate"
                            onChange={handleInput}
                            type="number"
                        />
                    </View>
                    <View>
                    <Calendar
                        onDayPress={(day) => {console.log('selected day', day)}}

                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 350
                        }}
                      />
                        <Button label={strings.LOGIN} onPress={submitTrip} />
                    </View>
                </View>
            </View>
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 'fit-content',
      width: '90%',
      alignSelf: 'center',
      margin: 10,
      padding: 10

    },
    formContainer: {
        width: '80%',
        alignSelf: 'center'
    },
    text: {
      fontSize: 30,
      color: colors.NAVY
    }
  })

const formStyles = StyleSheet.create({
    doubleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    full: {
        width: '100%',
        textAlign: 'center'
    },
    half: {
        width: '45%',
        textAlign: 'center'
    }
})
const textStyles = StyleSheet.create({
    addCity: {
        textAlign: 'center'
    },
    heading: {
        alignSelf: 'center',
        marginTop: 30
    }
})
    

export default NewTrip;
  