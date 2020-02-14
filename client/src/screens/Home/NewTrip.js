
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';

import strings from '../../config/strings';
import colors from "../../config/colors"
import FormTextInput from '../../components/elements/FormTextInput';
import gql from 'graphql-tag';

const ADD_TRIP = gql`
    mutation AddTrip(
        $startDate:     Int!,
        $endDate:       Int,
        $locations:     [String!]!,
        $name:          String,
        $description:   String,
        $creator:       String!
    ) {
    signup(
        startDate:      $startDate, 
        endDate:        $endDate, 
        locations:      $locations,
        name:           $name, 
        description:    $description, 
        creator:        $creator
        ) {
        trip {
            startDate
            endDate
            locations
            #people
            #events
            name
            description
            creator
        }
    }
    }
`;


const NewTrip = ({ navigation }) => {
    const [savedTrip, { loading }] = useMutation(ADD_TRIP)

    const [trip, setTrip] = useState({});
    const handleInput = (evt) => {
        trip[evt.target.name] = evt.target.value
        setTrip({
            ...trip
        })
        console.log(trip)
    }

    return (
        <React.Fragment>
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
                            name="title"
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
                            name="location"
                        />
                    </View>
                    <View style={formStyles.doubleContainer}>
                        <FormTextInput 
                            style={formStyles.half}
                            onChange={handleInput}
                            name="startDate"
                        />
                        <FormTextInput 
                            style={formStyles.half}
                            name="dd"
                            onChange={handleInput}
                        />
                    </View>
                </View>
            </View>
        </React.Fragment>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: -1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 400,
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
  