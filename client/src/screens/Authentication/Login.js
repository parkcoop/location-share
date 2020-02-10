import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image} from 'react-native';

import { AuthContext } from '../../context';
import strings from '../../config/strings';
import { FormTextInput, Button } from "../../components/elements";
import colors from "../../config/colors"
import airplane from '../../assets/images/airplane.png'

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleUsernameChange = (input) => {
      setUsername(input)
  }

  const handlePasswordChange = (input) => {
      setPassword(input)
  }


  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image source={airplane}></Image>
          <View style={styles.form}>
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
            <Button label={strings.LOGIN} onPress={() => signIn(username, password)} />
            <Button label="New User" onPress={route.params?.handleNewUser} />
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