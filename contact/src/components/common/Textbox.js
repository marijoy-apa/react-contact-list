import React from "react";
import {  View, StyleSheet, TextInput } from 'react-native'

const Textbox = ({ placeholderText, value, onChangeText, keyboardType }) => {
    return (
        <View style={styles.textContainer}>
            <TextInput placeholder={placeholderText}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        height: 45,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15,
        borderColor: 'darkgrey'
    },
    inputStyle: {
        width: '100%',
        height: '100%'
    }
})

export default Textbox