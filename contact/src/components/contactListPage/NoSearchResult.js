import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

const NoSearchResult = ({ searchKeyword }) => {
    return (
        <View style={styles.container}>

            <FontAwesome name="search" size={50} color='grey'/>
            <Text style={styles.headerStyle}>No results for "{searchKeyword}"</Text>
            <Text style={styles.textStyle}>Check the spelling or try a new search</Text>

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



export default NoSearchResult