import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native'
import Textbox from '../components/Textbox'
import LinkButton from '../components/LinkButton'
import Spacer from '../components/Spacer';
import AddButton from '../components/AddButton'
import NumberInput from "../components/NumberInput";
import NotesInput from '../components/NotesInput';
import AddEmergencyButton from '../components/AddEmergencyButton';

const height = Dimensions.get('window').height;
const CreateContactScreen = ({ onCancel }) => {
    const [inputLength, setInputLength] = useState(1)

    renderNumberInput = () => {
        const numberInputs = [];
        for (let index = 0; index < inputLength; index++) {
            numberInputs.push(<NumberInput key={index} />)
        }
        return numberInputs;
    }

    return (
        <View style={styles.bottomSheet}>
            <ScrollView >
                <View style={styles.scrollContainer}>


                    <TouchableOpacity onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                    <Image style={styles.imageStyle} />
                    <LinkButton buttonText="Add Photo" />
                    <Textbox placeholderText={"First Name"} />
                    <Textbox placeholderText={"Last Name"} />

                    <Spacer style={{ height: 30 }} />
                    {renderNumberInput()}
                    <AddButton onPress={() => setInputLength(inputLength + 1)} />
                    <NotesInput/>
                    <AddEmergencyButton/>
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
        // alignItems: 'center'
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

export default CreateContactScreen