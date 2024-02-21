import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const LinkButton = ({ buttonText, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={styles.addPhotoButton}>{buttonText}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    addPhotoButton: {
        marginBottom: 30,
        color: 'blue', 
        alignSelf: 'center'
    }
})

LinkButton.options = {


    headerTitle: ''
}



export default LinkButton