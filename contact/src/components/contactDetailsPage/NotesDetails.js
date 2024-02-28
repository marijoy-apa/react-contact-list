import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'

const NotesDetails = ({ notes }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.notes}>Notes</Text>
            <Text style={styles.noteDetails}>{notes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        minHeight: 70,
        width: '100%',
        backgroundColor: 'lightgrey',
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 15,
    },
    notes: {
        fontSize: 12,
        color: 'grey'
    },
    noteDetails: {
        textAlign: 'justify',
        marginTop: 5,
        fontSize: 12,
    }
})

export default NotesDetails