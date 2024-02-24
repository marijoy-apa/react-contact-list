import React from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactIcons = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity disabled>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name="message"
                        style={styles.iconStyle} />
                    <Text style={styles.iconText}>Message</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name="call"
                        style={styles.iconStyle} />
                    <Text style={styles.iconText}>Call</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled>
                <View style={styles.iconContainer}>
                    <FontAwesome
                        name="video-camera"
                        style={styles.iconStyle} />
                    <Text style={styles.iconText}>Video</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name="email"
                        style={styles.iconStyle} />
                    <Text style={styles.iconText}>Mail</Text>
                </View>
            </TouchableOpacity>

        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 5,
    },
    iconContainer: {
        backgroundColor: 'lightgrey',
        height: 70,
        width: 88,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: {
        fontSize: 20,
        color: 'grey'
    },
    iconText: {
        marginTop: 5,
        color: 'grey',
        fontSize: 10,
    }


})



export default ContactIcons