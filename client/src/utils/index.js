import auth from './auth'
import trips from './trips'
import userService from './userService'

export default {
    ...trips,
    ...auth,
    ...userService
}