import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../config/strings';
import Button from "../components/elements/Button";
import FormTextInput from "../components/elements/FormTextInput"
import colors from "../config/colors"
import imageLogo from '../assets/images/logo-black.png';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserContext } from '../context';



const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username:$username,password:$password) {
        user {
          username
        }
        token
    }
  }
`;



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(useContext(UserContext));
console.log(session)
  const [login, { loading, error, data }] = useMutation(LOGIN);

  useEffect(() => {
    console.log('session updated lets navigate')

  }, [session]); 

  const handleUsernameChange = (input) => {
      setUsername(input)
  }

  const handlePasswordChange = (input) => {
      setPassword(input)
  }

  const handleLoginPress = async () => {
    try {
      const authPayload = await login({variables: {username, password}})

      // if (!loading) {
        console.log('lol', authPayload)
        setSession({token: authPayload.data.login.token, username: authPayload.data.login.user.username})
      // }
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View  style={styles.form}>
            <Text>{session && session.username}</Text>
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
              <Button label={strings.LOGIN} onPress={handleLoginPress} />
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