import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

const Button = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        backgroundColor: colors.NAVY,
        height: 50,
        paddingVertical:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: colors.RED,
        borderWidth: 1

        
    },
    text: {
        color: colors.WHITE
    }
})

export default Button;