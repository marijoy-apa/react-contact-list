import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PhoneNumbers = ({ item, isLast }) => {



    return (
        <View style={[styles.container, { borderBottomWidth: isLast ? 0 : 0.3 }]}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.number}>{item.digit}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 12,
        borderColor: 'grey',
        paddingVertical: 10,
    },
    type: {
        color: 'grey',
        fontSize: 12,
    },
    number: {
        fontSize: 18,
        color: '#007AFF'
    }



})



export default PhoneNumbers