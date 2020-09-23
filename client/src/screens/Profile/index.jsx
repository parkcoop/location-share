import React from 'react';
import styled from 'styled-components';
import AboutSection from './components/AboutSection'
import Feed from './components/Feed'
let { user } = require('../../screens/Authentication/data.json');

const Container = styled.div`
    /* background: #CDCDCD; */
    /* padding: 10px 0px 0px 10px; */
    margin: auto;
    width: 50%;
    height: 100%;  
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
`;



const Profile = () => {
  // debugger;
  return (
    <Container>
        <AboutSection />
        <Feed />
    </Container>
  )
}

export default Profile;
  