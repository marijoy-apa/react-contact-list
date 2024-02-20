import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const ContactItem = ({ item }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.nameText}>
                    {item.name}
                </Text>
                <MaterialIcons
                    name="emergency"
                    tyle={styles.icon} />
                <MaterialIcons
                    name="delete-outline"
                    style={styles.icon} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 45,
        borderBottomWidth: 0.3
    },
    icon: {
        fontSize: 15,
        color: 'grey'
    },

    nameText: {
        flex: 1, 
        color: 'grey'
    },
    xbutton: {
        fontSize: 23,
        color: 'grey'
    }

})

ContactItem.options = {


    headerTitle: ''
}



export default ContactItem