import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from "react-native-paper";

const AddEmergencyButton = ({ isEmergency, onPress }) => {
    const {colors} = useTheme()
    const text = isEmergency ? 'Remove from emergency contacts' : 'Add to emergency contacts'
    return (
        <TouchableOpacity onPress={onPress} style={styles.touchableStyle}>
            <View style={[styles.container, {backgroundColor: colors.primaryContainer}]}>
                <Text style={[isEmergency ? { color: '#007AFF' } : { color: 'red' }, 
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

    touchableStyle: {
        width: '100%',
    }
});


export default AddEmergencyButton