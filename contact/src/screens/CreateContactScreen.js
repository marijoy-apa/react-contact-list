import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { createContact, clearContactForm } from '../actions'

import ContactForm from "../components/createContactPage/ContactForm";
const height = Dimensions.get('window').height;
const CreateContactScreen = (props) => {


    const onSaveForm = () => {
        const {
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        } = props
        props.createContact({
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        props.onCancel()
    }

    const onCancelForm = () => {
        props.clearContactForm();
        props.onCancel();

    }

    return (
        <View style={styles.bottomSheet}>
            <View style={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={onCancelForm}>
                        <Text style={styles.cancelLink}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!props.isValid}
                        onPress={onSaveForm}>
                        <Text style={{ color: props.isValid ? 'blue' : 'grey' }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <ContactForm />
            </View>
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
    cancelLink: {
        color: 'blue'
    },
    createLink: {

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
    },
    headerContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 40,
        paddingHorizontal: 15
    }
})

const mapStateToProps = (state, ownProps) => {
    const  {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
    } = state.contactForm
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid: state.contactForm.isValid,
        onCancel: ownProps.onCancel
    }
}

export default connect(mapStateToProps, { createContact, clearContactForm })(CreateContactScreen)