
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler';

import strings from '../../config/strings';
import colors from "../../config/colors"
import FormTextInput from '../../components/elements/FormTextInput';


const NewTrip = ({ navigation }) => {
    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text style={styles.text}>
                    New Trip
                </Text>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={textStyles.heading}>
                            where to?
                        </Text>
                    </View>
                    <View>
                        <FormTextInput 
                            style={formStyles.full}
                            placeholder={strings.LOCATION_SEARCH_PLACEHOLDER}
                        />
                    </View>
                    <View style={formStyles.doubleContainer}>
                        <FormTextInput 
                            style={formStyles.half}
                        />
                        <FormTextInput 
                            style={formStyles.half}
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
  