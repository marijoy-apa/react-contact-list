import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AddEmergencyButton = ({ buttonText, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View>
            <Text style={styles.textButton}>Add to Emergency</Text>

            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    textButton: {
        marginBottom: 30,
        color: 'blue'
    }
});


export default AddEmergencyButton