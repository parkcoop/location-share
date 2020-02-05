import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username:$username, password:$password) {
        user 
        token
    }
  }
`;



const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username:$username,password:$password) {
        user {
          username
        }
        token
    }
  }
`;


export default {
    SIGNUP,
    LOGIN,
}