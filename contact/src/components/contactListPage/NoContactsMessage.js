import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

const NoContactsMessage = ({ contactText }) => {
    return (
        <View style={styles.container}>

            <Ionicons name="person-circle" size={50} color='grey'/>
            <Text style={styles.headerStyle}>No {contactText}</Text>
            <Text style={styles.textStyle}>{contactText} you've added will appear here</Text>

        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 20,
        // backgroundColor: 'lightgrey',
        // width: '100%',
        minHeight: 90,
        // padding: 20
    },

    headerStyle: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        color: 'grey'
    },
    textStyle: {
        fontSize: 12,
        color: 'grey'

    }


})



export default NoContactsMessage