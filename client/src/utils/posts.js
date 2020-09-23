import gql from 'graphql-tag';

const CREATE_POST = gql`
    mutation CreatePost($username: String!, $body: String!, $image: String) {
        createPost(username: $username, body: $body, image: $image) {
            body
            image    
        }
    }   
`;


const GET_POSTS = gql`
    query posts($username: String!) {
        getPosts(username: $username) {
            body
            username
            image
        }
    }
`



export default {
    CREATE_POST,
    GET_POSTS
}