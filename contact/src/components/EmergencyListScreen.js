import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'

const EmergencyListScreen = ({ navigation }) => {

    const navigateContactDetilsScreen = () => {
        
        navigation.navigate('Contact Details')
    }

    return (
        <View>
            <TouchableOpacity onPress={navigateContactDetilsScreen}>
                <Text>EmergencyListScreen</Text>
            </TouchableOpacity>

            <Button title="Add" onPress={() => { }} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EmergencyListScreen