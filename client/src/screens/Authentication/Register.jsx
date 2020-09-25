import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context';
import strings from '../../config/strings';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
    const Title = styled.h1`
    font-size: 2em;
    text-align: center;
    color: #CDCDCD;
    `;
    const Modal = styled.div`
        background: white;
        padding: 10px 0px 0px 10px;
        margin: 15%auto;
        width: 50vw;
        height: 30vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    const InputContainer = styled.div`
        display:flex;
        flex-direction: column;
    `;
    const UiButton = styled(Button)`
        background-color: #CDCDCD;
        margin: 5px 0px;
        width: 100%;
        height: 25px;
    `;
    const Input = styled.input`
        margin: 5px;

    `;
const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useContext(AuthContext);



  const handleUsernameChange = (input) => {
      setUsername(input.target.value)
  }

  const handleFullNameChange = (input) => {
      setFullName(input.target.value)
  }

  const handlePasswordChange = (input) => {
      setPassword(input.target.value)
  }

  const handleConfirmPasswordChange = (input) => {
      setConfirmPassword(input.target.value)
  }

  const setError = () => {
    // notify.error()
  }

  return (
      <div>
        <input
            value={fullName}
            onChange={(e) => handleFullNameChange(e)}
            placeholder={strings.FULLNAME_PLACEHOLDER}
        />
        <input
            value={username}
            onChange={(e) => handleUsernameChange(e)}
            placeholder={strings.USERNAME_PLACEHOLDER}
        />
        <input
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            placeholder={strings.PASSWORD_PLACEHOLDER}
        />
        <input
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e)}
            placeholder={strings.CONFIRM_PASSWORD_PLACEHOLDER}
        />
        <Button label={strings.REGISTER} onClick={() => {
            console.log("oka")
        const user = {
            fullName,
            username,
            password,
            confirmPassword
        }
        
        if (password === confirmPassword) return signUp(username, password, fullName)
        else {
            // notify.error('SIGNUP', 'Error signing up???')
        }
        }} />
      </div>
  )
}

  

export default Register