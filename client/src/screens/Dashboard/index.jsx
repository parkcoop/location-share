import React from 'react';
import styled from 'styled-components';

import Feed from './components/Feed'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
    background: #CDCDCD;
    padding: 10px 0px 0px 10px;
    margin: auto;
    width: 70%;
    height: 100vh;  
`;

const Dashboard = () => {
  // debugger;
  return (
    <Container>
      <Title>
        welcome to app
      </Title>
      <Feed></Feed>
    </Container>
  )
}

export default Dashboard;
  