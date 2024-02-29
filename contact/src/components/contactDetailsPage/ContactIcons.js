import React, { useState } from "react";
import { Text, View, StyleSheet, Linking } from 'react-native'
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dialog } from "react-native-elements";
import RadioButton from "../common/RadioButton";
import { useTheme } from "react-native-paper";
// ContactIcons component for displaying icons such as Message, Call, Video and Mail
const ContactIcons = ({ phone, onError }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { colors } = useTheme()
    //extract digits from phone array object
    const digits = phone.map(num => num.digit)

    const handleCallPress = () => {
        //Show modal for selection of phone number if there are multiple phone numbers, otherwise directly initiate the call
        if (phone.length > 1) {
            setModalVisible(true)
        }
        else {
            onCall(digits[0])
        }
    }

    const onSelectPhoneNum = (value) => {
        setModalVisible(false);
        onCall(value);
    }
    const onCall = async (value) => {
        const phoneUrl = `tel:${value}`;
        try {
            await Linking.openURL(phoneUrl);

        } catch (error) {
            // If not supported, update state for error to display error message
            console.log('Error opening phone URL:', error);
            onError('Unable to make phone call')

        }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity disabled>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
                    <MaterialIcons
                        name="message"
                        style={[styles.iconStyle, { color: colors.primary }]} />
                    <Text style={styles.iconText}>Message</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCallPress}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
                    <MaterialIcons
                        name="call"
                        style={styles.enabledIconStyle} />
                    <Text style={styles.enabledIconText}>Call</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity disabled>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
                    <FontAwesome
                        name="video-camera"
                        style={[styles.iconStyle, { color: colors.primary }]} />
                    <Text style={styles.iconText}>Video</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity disabled>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
                    <MaterialIcons
                        name="email"
                        style={[styles.iconStyle, { color: colors.primary }]} />
                    <Text style={styles.iconText}>Mail</Text>
                </View>
            </TouchableOpacity>

            <Dialog visible={modalVisible} onBackdropPress={() => { setModalVisible(false) }} overlayStyle={[styles.dialog, {backgroundColor: colors.secondaryContainer}]}>
                <RadioButton style={styles.dialog} onSelectPhoneType={onSelectPhoneNum} preselectedOption={digits[0]} options={digits} />
            </Dialog>

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
        fontSize: 12,
    },
    dialog: {
        backgroundColor: '#f1eeee',
        borderRadius: 23
    },
    enabledIconStyle: {
        fontSize: 20,
        color: '#007AFF'
    },
    enabledIconText: {
        marginTop: 5,
        color: '#007AFF',
        fontSize: 12,
    },
})

export default ContactIcons