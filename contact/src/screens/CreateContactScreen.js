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

const height = Dimensions.get('window').height;
const CreateContactScreen = (props, { onCancel }) => {
    const [inputLength, setInputLength] = useState(1)

    renderNumberInput = () => {
        const numberInputs = [];
        for (let index = 0; index < inputLength; index++) {
            numberInputs.push(<NumberInput key={index} />)
        }
        return numberInputs;
    }

    onUpdateFirstName = (value) => {
        props.contactFormUpdate({ prop: 'firstName', value })
    }
    onUpdateLastName = (value) => {
        props.contactFormUpdate({ prop: 'lastName', value })
    }

    return (
        <View style={styles.bottomSheet}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.scrollContainer}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={onCancel}>
                        <Text>Done</Text>
                    </TouchableOpacity> */}
                    <Image style={styles.imageStyle} />
                    <LinkButton buttonText="Add Photo" />
                    <Textbox
                        // value={props.firstName}
                        placeholderText={"First Name"}
                        onChangeText={onUpdateFirstName} />
                    <Textbox
                        // value={props.lastName}
                        placeholderText={"Last Name"}
                        onChangeText={onUpdateLastName}
                    />
                    <Spacer style={{ height: 30 }} />
                    {renderNumberInput()}
                    <AddButton onPress={() => setInputLength(inputLength + 1)} />
                    <NotesInput />
                    <AddEmergencyButton />
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
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
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