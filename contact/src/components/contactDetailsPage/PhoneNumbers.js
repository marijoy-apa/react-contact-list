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
        fontSize: 10,
    },
    number: {
        fontSize: 18,
        color: 'blue'
    }



})



export default PhoneNumbers