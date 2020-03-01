import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { AuthContext } from '../../context';
import { Button, FormTextInput} from "../../components/elements";
import { showMessage } from "react-native-flash-message";
import notify from '../../utils'
import strings from '../../config/strings';
import styles from './styles';

const Register = ({ navigation }) => {
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
    notify.error()
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
                  notify.error('SIGNUP', 'Error signing up???')
                }
                }} />
          </View>
      </KeyboardAvoidingView>
  )
}

  

export default Register