import React, { useState } from 'react';
// import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import colors from '../../config/colors';


const FormTextInput = ({style, ...otherProps}) => {
   return (
       <input
            selectionColor={colors.NAVY}
            style={[styles.textInput, style]}
            {...otherProps}
        />
   )
}
const styles = {
    textInput: {
        height: 40,
        width: '50%',
        borderColor: colors.STONE,
        borderBottomWidth: 1,
        marginBottom: 20
    }
}

export default FormTextInput;