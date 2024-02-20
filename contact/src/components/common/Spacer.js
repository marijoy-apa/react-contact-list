import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Spacer = ({ style }) => {
    return (
        <View style={[styles.container, style]}>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%'
    }
})



export default Spacer