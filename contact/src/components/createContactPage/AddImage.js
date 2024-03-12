import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { requestCameraPermissionsAsync, CameraType, launchCameraAsync } from 'expo-image-picker';
import { useTheme } from "react-native-paper";
const AddImage = ({ onPickImage, imageUrl, onError }) => {
    const {colors} = useTheme()
    const handleCameraLaunch = async () => {
        try {
            await requestCameraPermissionsAsync()
            let result = await launchCameraAsync({
                cameraType: CameraType.front,
                quality: 1
            })

            if (!result.canceled) {
                onPickImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('error update')
            onError('Unable to use camera')
        }

    }

    return (
        <View>
            <Image style={[styles.imageStyle, {backgroundColor: colors.primaryContainer}]} source={{ uri: imageUrl }} />

            <TouchableOpacity onPress={handleCameraLaunch}>
                <Text style={styles.addPhotoButton}>{imageUrl ? 'Change Photo' : 'Add Photo'}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
    },
    addPhotoButton: {
        marginBottom: 30,
        color: '#007AFF',
        alignSelf: 'center'
    }
})



export default AddImage