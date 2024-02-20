import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'

const NotesInput = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Text>Notes</Text>
            <TextInput style={styles.textInput} multiline />

        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 20,
        backgroundColor: 'lightgrey',
        width: '100%',
        minHeight: 90,
        padding: 20
    },
    textInput: {
        flex: 1, 
        width: '100%'
    },

})



export default NotesInput