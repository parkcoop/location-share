
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FormTextInput, Button } from "../../components/elements";
import { useMutation } from '@apollo/react-hooks';

import { UserContext } from '../../context';
import colors from "../../config/colors"
import strings from "../../config/strings"
import { ScrollView } from 'react-native-gesture-handler';
import userService from '../../utils'

const EditProfile = ({ navigation }) => {
    const user = useContext(UserContext)
    const [newDetails, setNewDetails] = useState(user);
    const [editProfile, { loading }] = useMutation(userService.EDIT_PROFILE)
    
    const submitDetails = () => {
        console.log(newDetails)
        editProfile({variables: newDetails})
    }
    
    const handleInput = (evt) => {
        newDetails[evt.target.name] = evt.target.value
        setNewDetails({
            ...newDetails
        })
        console.log(newDetails)
    }

    return (
        <ScrollView>
            <View>
                <Avatar
                    rounded
                    size="large"
                    containerStyle={styles.avatar}
                    source={{ uri: user.avatar }}
                />
                <Text style={styles.text}>
                    {user.fullName}
                </Text>
            </View>
            <View style={styles.formContainer}>
                <View>
                    <Text style={textStyles.heading}>
                        Username
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.username}
                        onChange={handleInput}
                        name="username"
                    />
                </View>
                <View>
                    <Text style={textStyles.heading}>
                        Full name
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.fullName}
                        onChange={handleInput}
                        name="fullName"
                    />
                </View>
                <View>
                    <Text style={textStyles.heading}>
                        Email
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.email}
                        onChange={handleInput}
                        name="email"
                    />
                </View>
                <View>
                    <Text style={textStyles.heading}>
                        Phone
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.phone}
                        onChange={handleInput}
                        name="phone"
                    />
                </View>
                <View>
                    <Text style={textStyles.heading}>
                        Location
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.location}
                        onChange={handleInput}
                        name="location"
                    />
                </View>
                <View>
                    <Text style={textStyles.heading}>
                        Language
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                        style={formStyles.full}
                        placeholder={user.language?.name}
                        onChange={handleInput}
                        name="language"
                    />
                </View>
                <View>
                    <Button label={strings.LOGIN} onPress={() => submitDetails()} />
                </View>
            </View>
        </ScrollView>
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
    formContainer: {
        width: '80%',
        alignSelf: 'center'
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
    

export default EditProfile;
  