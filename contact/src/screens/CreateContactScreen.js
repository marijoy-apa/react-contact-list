import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate } from '../actions'

import Textbox from '../components/common/Textbox'
import LinkButton from '../components/LinkButton'
import Spacer from '../components/common/Spacer';
import AddButton from '../components/AddButton'
import NumberInput from "../components/NumberInput";
import NotesInput from '../components/NotesInput';
import AddEmergencyButton from '../components/AddEmergencyButton';
import AddImage from '../components/AddImage'

const height = Dimensions.get('window').height;
const CreateContactScreen = (props, { onCancel }) => {
    const [inputLength, setInputLength] = useState(1);
    const [phoneNumbers, setPhoneNumbers] = useState([])


    const renderNumberInput = () => {
        const numberInputs = [];
        for (let index = 0; index < inputLength; index++) {
            numberInputs.push(<NumberInput
                key={index}
                onChange={onUpdateNumber}
                keyProp={index} />)
        }
        return numberInputs;
    }

    const onUpdateNumber = (value, index) => {
        var newPhone = [...phoneNumbers]
        newPhone[index] = value;
        setPhoneNumbers(newPhone);
        console.log(phoneNumbers, phoneNumbers.length);
    
        props.contactFormUpdate({ prop: 'phone', value: phoneNumbers })
    }

    const onUpdateFirstName = (value) => {
        props.contactFormUpdate({ prop: 'firstName', value })
    }

    const onUpdateLastName = (value) => {
        props.contactFormUpdate({ prop: 'lastName', value })
    }

    const onUpdateNotes = (value) => {
        props.contactFormUpdate({ prop: 'notes', value })
    }

    const onUpdateIsEmergency = () => {
        props.contactFormUpdate({ prop: 'emergencyContact', value: !props.emergencyContact })
    }

    return (
        <View style={styles.bottomSheet}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.scrollContainer}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <AddImage />
                    <Textbox
                        value={props.firstName}
                        placeholderText={"First Name"}
                        onChangeText={onUpdateFirstName} />
                    <Textbox
                        value={props.lastName}
                        placeholderText={"Last Name"}
                        onChangeText={onUpdateLastName}
                    />
                    <Spacer style={{ height: 30 }} />
                    {renderNumberInput()}
                    <AddButton onPress={() => setInputLength(inputLength + 1)} />
                    <NotesInput onChangeText={onUpdateNotes} value={props.notes} />
                    <AddEmergencyButton onPress={onUpdateIsEmergency} isEmergency={props.emergencyContact} />
                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        height: height * 0.85,
        backgroundColor: 'white',
        flex: 1,
    },
    scrollContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },

    addPhotoButton: {
        marginBottom: 30,
        color: 'blue'
    }
})

const mapStateToProps = (state, ownProps) => {
    const { firstName, lastName, phone, notes, emergencyContact, image } = state.contactForm;
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        onCancel: ownProps.onCancel
    }
}

export default connect(mapStateToProps, { contactFormUpdate })(CreateContactScreen)