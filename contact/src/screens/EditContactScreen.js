import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, createContact, clearContactForm, updateContact } from '../actions'

// import Textbox from '../components/common/Textbox'
// import Spacer from '../components/common/Spacer';
// import AddButton from '../components/contactListPage/AddButton'
// import NumberInput from "../components/createContactPage/NumberInput";
// import NotesInput from '../components/createContactPage/NotesInput';
// import AddEmergencyButton from '../components/createContactPage/AddEmergencyButton';
// import AddImage from '../components/createContactPage/AddImage'
import { useNavigation, useRoute } from "@react-navigation/native";
import ContactForm from "../components/createContactPage/ContactForm";
import SnackbarError from "../components/common/SnackbarError";

const height = Dimensions.get('window').height;
const EditContactScreen = (props) => {
    const { id } = useRoute().params
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight: () => (
                <TouchableOpacity disabled={!props.isValid}
                    onPress={() => {
                        onSaveForm();
                    }} >
                    <Text style={{ color: props.isValid ? '#007AFF' : 'grey', marginRight: 10 }}>Save</Text>
                </TouchableOpacity>
            )
        })

    }, [props.isValid, props])

    // execute clearContactForm when screen is unmounted
    useEffect(() => () => {
        props.clearContactForm();
    }, [])

    const onSaveForm = async () => {
        const {
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        } = props
        console.log('image', image)

        const isSuccess = await props.updateContact({
            id,
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })

        if (isSuccess) {
            navigation.pop(2)
        }
    }

    return (<>
        <ContactForm />
        <SnackbarError onDismiss={null}/>
    </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { firstName, lastName, phone, notes, emergencyContact, image, isValid } = state.contactForm;
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        onCancel: ownProps.onCancel,
    }
}

export default connect(mapStateToProps, { contactFormUpdate, createContact, clearContactForm, updateContact })(EditContactScreen)