import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import LinkButton from './LinkButton'
import {launchCamera} from 'react-native-image-picker'
const AddImage = ({ buttonText, onClick }) => {
    return (
        <View>
            <Image style={styles.imageStyle} />
            <LinkButton buttonText="Add Photo" />
        </View>

    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
    },
})



export default AddImage