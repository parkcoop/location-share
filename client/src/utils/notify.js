import { showMessage, hideMessage } from "react-native-flash-message"
import colors from '../config/colors'


const success = ( type, message ) => {
    const successBody = {
        message: "Success",
        description: message,
        type: "success",
        icon: "success",
        backgroundColor: colors.NAVY
    }
    switch(type) {
        case 'LOGIN': 
            return showMessage({
                ...successBody
            });
        case 'SIGNUP': 
            return showMessage({
                ...successBody
            });
    }
    
}

const error = ( type, message ) => {
    const errorBody = {
        description: message.split('error: ')[1] || message,
        type: "error",
        icon: "warning",
        backgroundColor: colors.RED
        
    }
    switch(type) {
        case 'LOGIN': 
            return showMessage({
                ...errorBody,
                message: "There was an error signing in."
            });
        case 'SIGNUP': 
            return showMessage({
                ...errorBody,
                message: "Registration Error"
            });
    }
    
}

export default {
    success,
    error
}