import React from "react";
import { Text, View, StyleSheet } from 'react-native'

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
        minHeight: 90,
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