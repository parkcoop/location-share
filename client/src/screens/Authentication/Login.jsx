import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context';
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
      <Modal >
          <Title>
              Welcome to Location Share
          </Title>
          <InputContainer>
            <Input
            type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e)}
            />
            <Input
                type="text"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
            />
            <UiButton onClick={() => signIn(username, password)} >Sign in</UiButton>
            <UiButton label="New User"  />
          </InputContainer>
      </Modal>
  )
}


  

export default Login