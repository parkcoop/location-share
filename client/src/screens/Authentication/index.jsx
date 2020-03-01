import React, { useContext, useMemo } from 'react';
import Login from './Login'
import { createStackNavigator } from '@react-navigation/stack';
import { useMutation } from '@apollo/react-hooks';
import 'react-native-gesture-handler';

import { AuthContext } from '../../context';
import notify from '../../utils'
import auth from '../../utils'
import Register from './Register'


const AuthStack = createStackNavigator();

const Authentication = ({ navigation }) => {
  const [login, { loading }] = useMutation(auth.LOGIN);
  const [signup, { signupLoading }] = useMutation(auth.SIGNUP);
  const dispatch = useContext(AuthContext);

  const handleNewUser = () => {
    navigation.navigate('Register')
  }

  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          const authPayload = await login({variables: {username, password}})
          if (!loading) {
            const { token } = authPayload.data.login;
            const user = authPayload.data.login.user;
            console.log(user)
            dispatch({
              user: {
                ...user,
                token
              },
              type: 'LOGIN'
            })
            notify.success('LOGIN', `Welcome to Travelers, ${user.username}`)
            navigation.navigate('Details')
          }
        }
        catch(err) {
          notify.error('LOGIN', err.message)
        }
      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      
      signUp: async (username, password, fullName) => {
        try {
          if (!username || !password || !fullName) throw new Error("Please enter all required fields.")
          const authPayload = await signup({variables: {username, password, fullName}})
          if (!signupLoading && authPayload) {
            const newUser = authPayload.data.signup?.user
            console.log('Signed up', authPayload)
            notify.success('SIGNUP', `Welcome to Travelers, ${newUser.username}. Please re-enter your username and password.`)
            navigation.navigate('Login')
          }
        }
        catch(err) {
          notify.error('SIGNUP', err.message)
        }


    },
    }),
    []
  );


    return (
      <AuthContext.Provider value={authContext}>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login" 
            component={Login} 
            options={{
              title: "Login"
            }}
            initialParams={{
              handleNewUser
            }}
          />
          <AuthStack.Screen
            name="Register" 
            component={Register} 
            options={{
              title: "Register"
            }}
          />
        </AuthStack.Navigator>
      </AuthContext.Provider>
        )
}

export default Authentication;
  