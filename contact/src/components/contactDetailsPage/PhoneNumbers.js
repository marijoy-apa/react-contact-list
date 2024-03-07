import React from "react";
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from "react-native-paper";

const PhoneNumbers = ({ item, isLast }) => {
    const { colors } = useTheme()
    return (
        <View testID="phone-number-input" style={[styles.container, { borderBottomWidth: isLast ? 0 : 0.3 },]}>
            <Text style={[styles.type, { color: colors.primary }]}>{item.type}</Text>
            <Text style={styles.number}>{item.digit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 15,
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