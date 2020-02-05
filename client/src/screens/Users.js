import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const GET_USERS = gql`
  {
    users {
      username
      password
    }
  }
  `;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log("RUNNING QUERY")
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  return data.users.map(user => {
    return (
      <View style={styles.new}>
        <Text style={styles.text}>
          {user.username}
        </Text>
      </View>
    )
  })
}

export default Users;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    new: {
      backgroundColor: '#3e3e3e',
      borderWidth: '5px',
      margin: 5,
      height: '50px',
      width: '50%',
      alignSelf: 'center'
    },
    text: {
      color: 'orange',
  
    }
  
  });
  