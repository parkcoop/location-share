import gql from 'graphql-tag';

const CREATE_POST = gql`
    mutation CreatePost($username: String!, $body: String!) {
        createPost(username: $username, body: $body) {
            message
            code    
        }
    }   
`;


const GET_POSTS = gql`
    query posts($username: String!) {
        posts(username: $username) {
            body
            ID
        }
    }
`



export default {
    CREATE_POST,
    GET_POSTS
}