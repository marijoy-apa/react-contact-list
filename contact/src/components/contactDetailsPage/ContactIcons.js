import React, { useState } from "react";
import { Text, View, StyleSheet, Linking } from 'react-native'
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dialog } from "react-native-elements";
import RadioButton from "../common/RadioButton";
const ContactIcons = ({ phone }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleCallPress = () => {
        console.log('number to call hehe', phone)

        const number = numberSelectionModal()
        console.log('number to call', number)

        // const phoneNum = 123213123
        // const phoneUrl = `tel:${phoneNum}`;
        // Linking.openURL(phoneUrl)
    }

    const numberSelectionModal = () => {
        phoneNum = phone[0].digit;
        console.log(phone.length)
        if (phone.length > 1) {
            console.log(phone.length)

            setModalVisible(true)
        }
        return phoneNum
    }


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
            <TouchableOpacity onPress={handleCallPress}>
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
            <Dialog visible={modalVisible} onBackdropPress={() => { setModalVisible(false) }} overlayStyle={styles.dialog}>
                <RadioButton style={styles.dialog} onSelectPhoneType={()=>{}} preselectedOption={phone[0]} />
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


})



export default ContactIcons