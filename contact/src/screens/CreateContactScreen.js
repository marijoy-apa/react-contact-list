import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, createContact, clearContactForm } from '../actions'

// import Textbox from '../components/common/Textbox'
// import LinkButton from '../components/common/LinkButton'
// import Spacer from '../components/common/Spacer';
// import AddButton from '../components/contactListPage/AddButton'
// import NumberInput from "../components/createContactPage/NumberInput";
// import NotesInput from '../components/createContactPage/NotesInput';
// import AddEmergencyButton from '../components/createContactPage/AddEmergencyButton';
// import AddImage from '../components/createContactPage/AddImage'
import ContactForm from "../components/createContactPage/ContactForm";
const height = Dimensions.get('window').height;
const CreateContactScreen = (props) => {

    // const renderNumberInput = () => {
    //     const numberInputs = [];
    //     for (let index = 0; index < props.phone.length; index++) {
    //         numberInputs.push(<NumberInput
    //             key={index}
    //             onChangeNumber={onUpdatePhoneNumber}
    //             onChangePhoneType={onUpdatePhoneType}
    //             index={index}
    //             phoneInput={{
    //                 type: props.phone[index].type,
    //                 digit: props.phone[index].digit
    //             }} />
    //         )
    //     }
    //     return numberInputs;
    // }
    // const onUpdatePhoneType = (value, index) => {
    //     var phone = [...props.phone]
    //     phone[index] = { ...phone[index], type: value };
    //     props.contactFormUpdate({ prop: 'phone', value: phone })
    // }

    // const onUpdatePhoneNumber = (value, index) => {
    //     var phone = [...props.phone]
    //     phone[index] = { ...phone[index], digit: value };
    //     props.contactFormUpdate({ prop: 'phone', value: phone })
    // }

    // const onAddPhoneField = () => {
    //     var phone = [...props.phone, { type: 'Phone', digit: '' }]
    //     props.contactFormUpdate({ prop: 'phone', value: phone })
    // }

    // const onUpdateFirstName = (value) => {
    //     var newvalue = value.charAt(0).toUpperCase() + value.slice(1)
    //     props.contactFormUpdate({ prop: 'firstName', value: newvalue })
    // }

    // const onUpdateLastName = (value) => {
    //     newvalue = value.charAt(0).toUpperCase() + value.slice(1)
    //     props.contactFormUpdate({ prop: 'lastName', value: newvalue })
    // }

    // const onUpdateNotes = (value) => {
    //     props.contactFormUpdate({ prop: 'notes', value })
    // }

    // const onUpdateIsEmergency = () => {
    //     props.contactFormUpdate({ prop: 'emergencyContact', value: !props.emergencyContact })
    // }
    // const onPickImage = (value) => {
    //     console.log('on Pick Image', value)
    //     props.contactFormUpdate({ prop: 'image', value })
    // }

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

                    {/* <AddImage onPickImage={onPickImage} imageUrl={props.image} />
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
                    <AddButton onPress={onAddPhoneField} />
                    <NotesInput onChangeText={onUpdateNotes} value={props.notes} />
                    <AddEmergencyButton onPress={onUpdateIsEmergency} isEmergency={props.emergencyContact} /> */}
                    <ContactForm/>
                </View>

            {/* </ScrollView> */}

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
    const { firstName, lastName, phone, notes, emergencyContact, image, isValid } = state.contactForm;
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        onCancel: ownProps.onCancel
    }
}

export default connect(mapStateToProps, { contactFormUpdate, createContact, clearContactForm })(CreateContactScreen)