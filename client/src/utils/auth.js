import gql from 'graphql-tag';

const SIGNUP = gql`
    mutation SignUp($username: String!, $password: String!, $fullName: String!) {
    signup(username:$username, password:$password, fullName: $fullName) {
        user {
            username
            password
            fullName
        }
        token
    }
    }
`;

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
    login(username:$username,password:$password) {
        user {
            username
            password
            fullName
            avatar
            language {
            iso
            name
            nativeName
            }
            trips {
            startDate
            endDate
            locations {
                city
            }
            }
            friends {
            username
            fullName
            }
            wishTrips {
            locations {
                city
                country {
                name
                }
            }
            }
            interests
        }
        token
    }
    }
`;

export default {
    SIGNUP,
    LOGIN
}