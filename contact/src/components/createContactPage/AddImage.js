import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import LinkButton from '../common/LinkButton'

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
            <Image style={styles.imageStyle} source={{ uri: image }} />
            {/* <LinkButton buttonText={image ? 'Change Photo' : 'Add Photo'} onClick={handleCameraLaunch} /> */}

            <TouchableOpacity onPress={handleCameraLaunch}>
                <Text style={styles.addPhotoButton}>{image ? 'Change Photo' : 'Add Photo'}</Text>
            </TouchableOpacity>
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
    addPhotoButton: {
        marginBottom: 30,
        color: 'blue',
        alignSelf: 'center'
    }
})



export default AddImage