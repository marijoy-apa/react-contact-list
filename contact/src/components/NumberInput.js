import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Textbox from './Textbox';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const NumberInput = ({ }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.textInput}>
                        Phone
                    </Text>
                    <MaterialCommunityIcons  name="greater-than" style={[styles.textInput, {fontSize: 15,}]}/>
                </View>
            </TouchableOpacity>
            <View style={styles.textboxContainer}>
                <Textbox placeholderText="Phone" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        height: 45,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15,
        borderColor: 'darkgrey',
        flexDirection: 'row'
    },
    inputStyle: {
        width: '100%'
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    dropdownContainer: {
        height: '70%',
        flexDirection: "row",
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: 'darkgrey',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    textboxContainer: {
        flex: 6,
    }, 
    textInput:{
        fontSize: 12, 
        color: 'darkgrey',
    }, 


})

export default NumberInput