import gql from 'graphql-tag';

const ADD_TRIP = gql`
    mutation AddTrip(
        $startDate:     Int!,
        $endDate:       Int,
        $locations:     [String!]!,
        $name:          String,
        $description:   String,
        $creator:       String!
    ) {
    signup(
        startDate:      $startDate, 
        endDate:        $endDate, 
        locations:      $locations,
        name:           $name, 
        description:    $description, 
        creator:        $creator
        ) {
        trip {
            startDate
            endDate
            locations
            #people
            #events
            name
            description
            creator
        }
    }
    }
`;

export default {
    ADD_TRIP
}