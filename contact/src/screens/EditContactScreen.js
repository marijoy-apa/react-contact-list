import React, { useEffect } from "react";
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, clearContactForm, updateContact, updateError } from '../actions'

import { useNavigation, useRoute } from "@react-navigation/native";
import ContactForm from "../components/createContactPage/ContactForm";
import SnackbarError from "../components/common/SnackbarError";

const EditContactScreen = (props) => {
    const { id } = useRoute().params
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight
        })

    }, [props])

    useEffect(() => () => {
        props.clearContactForm();
    }, [])

    const headerRight = () => (
        <TouchableOpacity disabled={!props.isValid}
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
        <ContactForm onError={props.updateError} />
        <SnackbarError />
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

export default connect(mapStateToProps, { contactFormUpdate, clearContactForm, updateContact, updateError })(EditContactScreen)