import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import LinkButton from './LinkButton'
import { launchCamera } from 'react-native-image-picker'

import { requestCameraPermissionsAsync, CameraType, launchImageLibraryAsync, MediaTypeOptions, launchCameraAsync } from 'expo-image-picker';

const AddImage = ({ onPickImage }) => {
    const [image, setImage] = useState(null)

    const handleCameraLaunch = async () => {
        try {
            await requestCameraPermissionsAsync()
            let result = await launchCameraAsync({
                cameraType: CameraType.front,
                quality: 1
            })
            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                onPickImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View>
            <Image style={styles.imageStyle} source={{uri: image}}/>
            <LinkButton buttonText="Add Photo" onClick={handleCameraLaunch} />
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