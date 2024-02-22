import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AddEmergencyButton = ({ isEmergency, onPress }) => {
    const text = isEmergency ? 'Remove from emergency contacts' : 'Add to emergency contacts'
    return (
        <TouchableOpacity onPress={onPress} style={styles.touchableStyle}>
            <View style={styles.container}>
                <Text style={[isEmergency ? { color: 'blue' } : { color: 'red' }, 
                { marginLeft: 20 }]}>{text}</Text>
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