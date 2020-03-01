import gql from 'graphql-tag';

const ADD_TRIP = gql`
    mutation AddTrip($startDate: Int!, $endDate: Int, $locations: [String!]!, $name: String!, $description: String!, $creator: ID!) {
        addTrip(startDate: $startDate, endDate: $endDate, locations: $locations, name: $name, description: $description, creator: $creator) {
            message
            code    
        }
    }   
`;


const GET_TRIPS = gql`
    query trips($userId: ID!) {
        trips(userId: $userId) {
            creator
            description
            startDate
            name
        }
    }
`



export default {
    ADD_TRIP,
    GET_TRIPS
}