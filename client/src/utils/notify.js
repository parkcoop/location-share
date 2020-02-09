import { showMessage, hideMessage } from "react-native-flash-message"
import colors from '../config/colors'


const success = ( type, message ) => {
    const successBody = {
        message: "Success",
        description: message,
        type: "success",
        backgroundColor: colors.NAVY
    }
    switch(type) {
        case 'LOGIN': 
            showMessage({
                ...successBody
            });
        case 'SIGNUP': 
            showMessage({
                ...successBody
            });
    }
    
}

const error = ( type, message ) => {
    const errorBody = {
        description: message.split('error: ')[1] || message,
        type: "error",
        backgroundColor: colors.RED
        
    }
    switch(type) {
        case 'LOGIN': 
            showMessage({
                ...errorBody,
                message: "There was an error signing in."
            });
        case 'SIGNUP': 
            showMessage({
                ...errorBody,
                message: "Registration Error"
            });
    }
    
}

export default {
    success,
    error
}