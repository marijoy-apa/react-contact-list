import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    },
    notes: {
        fontSize: 10,
    },
    noteDetails: {
        // flex: 1,
        textAlign: 'justify',
        // justifyContent: 'center',
        marginTop: 5,
        fontSize: 12,
        // color: 'blue'
    }



})



export default NotesDetails