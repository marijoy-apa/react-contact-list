import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { useTheme } from "react-native-paper";
const NotesInput = ({ onChangeText, value }) => {
    const { colors } = useTheme()
    return (
        <View style={[styles.container, {backgroundColor: colors.primaryContainer}]}>
            <Text style={{color: colors.primary}}>Notes</Text>
            <TextInput style={[styles.textInput, {color: colors.secondary}]} onChangeText={onChangeText} value={value} />
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
        width: '100%',
        textAlign: "justify"
    },

})



export default NotesInput