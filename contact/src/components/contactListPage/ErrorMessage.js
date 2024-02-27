import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

const ErrorMessage = ({ error }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Oops!</Text>
            <Text style={styles.textStyle}>{error}</Text>

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



export default ErrorMessage