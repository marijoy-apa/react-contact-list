import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, createContact, clearContactForm, updateError } from '../../actions'

import Textbox from '../common/Textbox'
import Spacer from '../common/Spacer';
import AddButton from '../contactListPage/AddButton'
import NumberInput from "../createContactPage/NumberInput";
import NotesInput from '../createContactPage/NotesInput';
import AddEmergencyButton from '../createContactPage/AddEmergencyButton';
import AddImage from '../createContactPage/AddImage'

const ContactForm = (props) => {

    //render the numberInput depending on the state of phone length of form
    const renderNumberInput = () => {
        const numberInputs = [];
        for (let index = 0; index < props.phone.length; index++) {
            numberInputs.push(<NumberInput
                key={index}
                onChangeNumber={onUpdatePhoneNumber}
                onChangePhoneType={onUpdatePhoneType}
                index={index}
                phoneInput={{
                    type: props.phone[index].type,
                    digit: props.phone[index].digit
                }} />
            )
        }
        return numberInputs;
    }

    const onUpdatePhoneType = (value, index) => {
        var phone = [...props.phone]
        phone[index] = { ...phone[index], type: value };
        props.contactFormUpdate({ prop: 'phone', value: phone })
    }

    const onUpdatePhoneNumber = (value, index) => {
        var phone = [...props.phone]
        phone[index] = { ...phone[index], digit: value };
        props.contactFormUpdate({ prop: 'phone', value: phone })
    }

    const onAddPhoneField = () => {
        var phone = [...props.phone, { type: 'Phone', digit: '' }]
        props.contactFormUpdate({ prop: 'phone', value: phone })
    }

    const onUpdateFirstName = (value) => {
        var newvalue = value.charAt(0).toUpperCase() + value.slice(1)
        props.contactFormUpdate({ prop: 'firstName', value: newvalue })
    }

    const onUpdateLastName = (value) => {
        newvalue = value.charAt(0).toUpperCase() + value.slice(1)
        props.contactFormUpdate({ prop: 'lastName', value: newvalue })
    }

    const onUpdateNotes = (value) => {
        console.log('notes value', value)
        props.contactFormUpdate({ prop: 'notes', value })
    }

    const onUpdateIsEmergency = () => {
        props.contactFormUpdate({ prop: 'emergencyContact', value: !props.emergencyContact })
    }
    
    const onPickImage = (value) => {
        console.log('on Pick Image', value)
        props.contactFormUpdate({ prop: 'image', value })
    }


    return (
        <View style={styles.bottomSheet}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.scrollContainer}>
                    <AddImage onPickImage={onPickImage} imageUrl={props.image} onError={props.updateError} />
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
        flex: 1,
        width: '100%'
    },

    scrollContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flex: 1,
        alignItems: 'center',
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

export default connect(mapStateToProps, { contactFormUpdate, createContact, clearContactForm, updateError })(ContactForm)