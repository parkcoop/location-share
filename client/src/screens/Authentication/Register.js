import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context';

import { StyleSheet, Image, View, ScrollView,ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import strings from '../../config/strings';
import Button from "../../components/elements/Button";
import FormTextInput from "../../components/elements/FormTextInput"
import colors from "../../config/colors"
import { showMessage, hideMessage } from "react-native-flash-message";


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useContext(AuthContext);

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

  const setError = () => {
    showMessage({
      message: "Password mismatch",
      description: "Please ensure that both passwords match",

      type: "error",
    });
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.form}>
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
              <Button label={strings.REGISTER} onPress={() => {
                const user = {
                  fullName,
                  username,
                  password,
                  confirmPassword
                }
                
                if (password === confirmPassword) return signUp(username, password, fullName)
                else {
                  setError();
                }
                }} />
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