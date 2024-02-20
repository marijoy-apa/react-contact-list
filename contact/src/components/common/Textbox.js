import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Textbox = ({ placeholderText, value, onChangeText }) => {
    return (
        <View style={styles.textContainer}>
            <TextInput placeholder={placeholderText} value={value} onChangeText={onChangeText} />
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
        width: '100%'
    }

})

Textbox.options = {


    headerTitle: ''
}



export default Textbox