import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../../config/strings';
import Button from "../../components/elements/Button";
import FormTextInput from "../../components/elements/FormTextInput"
import colors from "../../config/colors"
import imageLogo from '../../assets/images/logo-black.png';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserContext } from '../../context';



const SIGNUP = gql`
  mutation SignUp($username: String!, $password: String!) {
    signup(username:$username, password:$password) {
        user {
            username
            password
        }
        token
    }
  }
`;



const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [session, setSession] = useState(useContext(UserContext));
  const [signup, { loading, error, data }] = useMutation(SIGNUP);

//   useEffect(() => {
//     console.log('session updated lets navigate')
    
//     session && session.token && navigation.navigate('Details')
//   }, [session]); 

  const handleUsernameChange = (input) => {
      setUsername(input)
  }
  const handleFullNameChange = (input) => {
      setFullName(input)
  }
  const handlePasswordChange = (input) => {
      setPassword(input)
  }
  const handleConfirmPasswordChange = (input) => {
      setConfirmPassword(input)
  }

  const handleRegisterPress = async () => {
      console.log({username, fullName, password, confirmPassword})
    try {
      const authPayload = await signup({variables: {username, password}})

      // if (!loading) {
        console.log('Signed up', authPayload)
        // setSession({token: authPayload.data.login.token, username: authPayload.data.login.user.username})
      // }
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.form}>
            <Text>{session && session.username}</Text>
              <FormTextInput
                  value={fullName}
                  onChangeText={handleFullNameChange}
                  placeholder={strings.FULLNAME_PLACEHOLDER}
              />
              <FormTextInput
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholder={strings.USERNAME_PLACEHOLDER}
              />
              <FormTextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={strings.PASSWORD_PLACEHOLDER}
              />
              <FormTextInput
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder={strings.CONFIRM_PASSWORD_PLACEHOLDER}
              />
              <Button label={strings.REGISTER} onPress={handleRegisterPress} />
          </View>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%"
  },
  logo: {
    // width: 0
    marginTop: 150,
    width: 310,
    height: 35
  },
  text: {
    color: 'white'
  }
})
  

export default Login