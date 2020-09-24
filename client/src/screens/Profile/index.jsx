import React, { useState } from 'react';
import styled from 'styled-components';
import AboutSection from './components/AboutSection'
import Feed from './components/Feed'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';



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

const GET_USER = gql`
  query user($username: String!) {
        getUser(username: $username) {
        username
        posts {
          body
        }
        avatar
        id
        }
    }
  `;

const Profile = () => {
  let { username } = useParams();
  console.log(username)
  const { loading, error, data } = useQuery(GET_USER,
    {
        variables: {
            username
        }
    });;
  let requestedUser = data && data.getUser
  console.log("BEFORE FEED", requestedUser)
  // debugger;
  return (
    <Container>
        <AboutSection user={requestedUser} />
        <Feed user={requestedUser} />
    </Container>
  )
}

export default Profile;
  