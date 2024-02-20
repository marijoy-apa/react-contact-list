import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <FontAwesome name="search" style={styles.searchButton} />
            <TextInput placeholder="Search" style={styles.textInput} />
            <Ionicons name="close-circle" style={styles.xbutton} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgray',
        height: 40,
        borderRadius: 13,
        paddingHorizontal: 20
    },
    searchButton: {
        fontSize: 23,
        color: 'darkgrey'
    },

    textInput: {
        marginLeft: 20,
        flex: 1
    },
    xbutton: {
        fontSize: 23,
        color: 'darkgrey'
    }

})

SearchBar.options = {


    headerTitle: ''
}



export default SearchBar