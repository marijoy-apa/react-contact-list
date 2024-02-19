import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const ContactListScreen = ({ navigation }) => {

    const navigateContactDetilsScreen = () => {

        navigation.navigate('Contact Details')
    }

    return (
        <View>
            <TouchableOpacity onPress={navigateContactDetilsScreen}>
                <Text>ContactList Screen</Text>
            </TouchableOpacity>

            <Button title="Add" onPress={() => { }} />
        </View>
    )
}

const styles = StyleSheet.create({

})

ContactListScreen.options = {
    headerShown: false,
    // tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={20} color={color} />)
}

export default ContactListScreen