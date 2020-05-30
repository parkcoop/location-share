import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context';

// import styles from './styles'
// import colors from "../../config/colors"
// import strings from '../../config/strings';

import airplane from '../../assets/images/airplane.png'

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleUsernameChange = (input) => {
      console.log(input.target.value)
      setUsername(input.target.value)
  }

  const handlePasswordChange = (input) => {
      console.log(input.target.value)
      setPassword(input.target.value)
  }


  return (
      <div >
          <img source={airplane}></img>
          <div>
            <input
            type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e)}
            />
            <input
            type="text"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
            />
            <button label="LOGIN" onClick={() => signIn(username, password)} />
            <button label="New User"  />
          </div>
      </div>
  )
}


  

export default Login