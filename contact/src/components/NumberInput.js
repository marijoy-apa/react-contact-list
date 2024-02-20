import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Textbox from './common/Textbox';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dialog, Radio } from 'react-native-elements'
import RadioButton from "./common/RadioButton";

const NumberInput = ({ }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneType, setPhoneType] = useState('Phone');

    const showModal = () => {
        setModalVisible(true);
    };


    const onSelectPhoneType = (value) => {
        setPhoneType(value)
        setModalVisible(false);

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={showModal}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.textInput}>
                        {phoneType}
                    </Text>
                    <MaterialCommunityIcons name="greater-than" style={[styles.textInput, { fontSize: 15, }]} />
                </View>
            </TouchableOpacity>
            <View style={styles.textboxContainer}>
                <Textbox placeholderText={phoneType} />

            </View>
            <Dialog visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <RadioButton onSelectPhoneType={onSelectPhoneType} preselectedOption={phoneType} />
                </View>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        height: 45,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15,
        borderColor: 'darkgrey',
        flexDirection: 'row'
    },
    inputStyle: {
        width: '100%'
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    dropdownContainer: {
        height: '70%',
        flexDirection: "row",
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: 'darkgrey',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    textboxContainer: {
        flex: 6,
    },
    textInput: {
        fontSize: 12,
        color: 'darkgrey',
    },
    modalContainer: {
        height: 230,
    }

})

export default NumberInput