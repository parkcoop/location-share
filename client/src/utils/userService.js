import gql from 'graphql-tag';

const EDIT_PROFILE = gql`
    mutation editUserDetails($id: String!, $username: String, $fullName: String, $avatar: String, $email: String, $phone: String, $location: String, $language: String) {
        editUserDetails(id: $id, username: $username, fullName: $fullName, avatar: $avatar, email: $email, phone: $phone, location: $location, language: $language) {
            message
            code    
        }
    }   
`;

export default {
    EDIT_PROFILE
}