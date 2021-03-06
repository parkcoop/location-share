import React, { useContext, useMemo } from 'react';
import Login from './Login'
import Register from './Register'
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie'
import { AuthContext } from '../../context';
import auth from '../../utils'

const Authentication = () => {
  const [login, { loading }] = useMutation(auth.LOGIN);
  const [signup, { signupLoading }] = useMutation(auth.SIGNUP);
  const dispatch = useContext(AuthContext);

  // const handleNewUser = () => {
  //   navigation.navigate('Register')
  // }

  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          const authPayload = await login({variables: {username, password}})
          if (!loading) {
            const { token } = authPayload.data.login;
            const user = authPayload.data.login.user;
            Cookies.set("token", token)
            console.log(user)
            dispatch({
              user: {
                id: user.id,
                username: user.username,
                password: user.password,
                avatar: user.avatar,
                token: user.token,
              },
              type: 'LOGIN'
            })
            // window.location.href = '/dashboard'
            // notify.success('LOGIN', `Welcome to Travelers, ${user.username}`)
            // navigation.navigate('Details')
          }
        }
        catch(err) {
          console.log('shit')
          // notify.error('LOGIN', err.message)
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
            // notify.success('SIGNUP', `Welcome to Travelers, ${newUser.username}. Please re-enter your username and password.`)
            window.location.href = '/login'
          }
        }
        catch(err) {
          console.log('shit')
          // notify.error('SIGNUP', err.message)
        }


    },
    }),
    []
  );


    return (
      <AuthContext.Provider value={authContext}>
        <Login>
        </Login>
        <Register>
        </Register>
      </AuthContext.Provider>
        )
}

export default Authentication;
  