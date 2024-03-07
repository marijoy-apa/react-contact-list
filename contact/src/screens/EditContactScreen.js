import React, { useEffect } from "react";
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, clearContactForm, updateContact, contactFormFillout, updateError } from '../actions'

import { useNavigation, useRoute } from "@react-navigation/native";
import ContactForm from "../components/createContactPage/ContactForm";
import SnackbarError from "../components/common/SnackbarError";

const EditContactScreen = (props) => {
    const { id } = useRoute().params
    const item = props.contactList.find(contact => contact.id === id)

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight
        })

    }, [props])

    useEffect(() => {
        props.contactFormFillout(item);

        return () => {
            props.clearContactForm();
        }
    }, [props.isPopulated])

    const headerRight = () => (
        <TouchableOpacity disabled={!props.isValid} testID="on-save-button"
            onPress={() => {
                onSaveForm();
            }} >
            <Text style={{ color: props.isValid ? '#007AFF' : 'grey', marginRight: 10 }}>Save</Text>
        </TouchableOpacity>
    )

    const onSaveForm = async () => {
        const {
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        } = props
        const result = await props.updateContact({
            id,
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        if (result.success) {
            navigation.pop(2)
        }
    }

    return (<>
        <ContactForm onError={props.updateError} />
        <SnackbarError />
    </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { firstName, lastName, phone, notes, emergencyContact, image, isValid, isPopulated } = state.contactForm;
    return {
        contactList: state.contactList.list,
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        isPopulated,
        onCancel: ownProps.onCancel,
    }
}

export default connect(mapStateToProps, { contactFormUpdate, clearContactForm, updateContact, updateError, contactFormFillout })(EditContactScreen)