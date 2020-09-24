import gql from 'graphql-tag';

const CREATE_POST = gql`
    mutation CreatePost($userId: String!, $username: String!, $body: String!, $image: String) {
        createPost(userId: $userId, username: $username, body: $body, image: $image) {
            body
            image    
        }
    }   
`;


const GET_POSTS = gql`
    query posts($userId: String, $username: String) {
        getPosts(userId: $userId, username: $username) {
            body
            postedBy {
                username
                avatar
            }
            image
            comments {
                username
                body
            }
            likes
            location {
                city
                country
            }

        }
    }
`



export default {
    CREATE_POST,
    GET_POSTS
}