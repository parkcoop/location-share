import auth from './auth'
import trips from './trips'
import posts from './posts'
import userService from './userService'

export default {
    ...trips,
    ...auth,
    ...userService,
    ...posts
}