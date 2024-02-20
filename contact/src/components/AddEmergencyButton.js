import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AddEmergencyButton = ({ buttonText, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick} style={styles.touchableStyle}>
            <View style={styles.container}>
                <Text style={styles.textButton}>Add to Emergency</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        height: 45,
        width: "100%",
        justifyContent: 'center'
    },
    textButton: {
        color: 'blue',
        marginLeft: 20
    },
    touchableStyle: {
        width: '100%',
    }
});


export default AddEmergencyButton