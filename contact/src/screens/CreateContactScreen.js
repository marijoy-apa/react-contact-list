import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ToastAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { createContact, clearContactForm } from '../actions'
import ContactForm from "../components/createContactPage/ContactForm";
import { Snackbar } from 'react-native-paper'
import { Ionicons } from "@expo/vector-icons";
const height = Dimensions.get('window').height;
const CreateContactScreen = (props) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    // useEffect(()=>{
    //     if (props.error) {
    //         setSnackbarVisible(true)
    //     }
    // }, [props.error])

    const onSaveForm = async () => {
        setSnackbarVisible(true)
        const {
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        } = props
        const isSuccess = await props.createContact({
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        if (!isSuccess) {
            setSnackbarVisible(true);
            return;
        }
        console.log('isSuccess', isSuccess)
        props.onCancel()
    }

    const onCancelForm = () => {
        props.clearContactForm();
        props.onCancel();

    }

    const onDismissSnackbar = () => {
        setSnackbarVisible(false);
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
                        <Text style={{ color: props.isValid ? '#007AFF' : 'grey' }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <ContactForm />
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackbar}
                    duration={3000}
                    action={{
                        icon: (() => <Ionicons name="close-circle" color='grey' size={20} />),
                        onPress:  onDismissSnackbar ,

                    }}>{props.error}
                </Snackbar>
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
        color: '#007AFF'
    },
    // createLink: {

    // },
    scrollContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },

    // addPhotoButton: {
    //     marginBottom: 30,
    //     color: 'blue'
    // },
    headerContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'lightgrey',
        width: '100%',
        height: 40,
        paddingHorizontal: 15
    }
})

const mapStateToProps = (state, ownProps) => {
    const {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        error
    } = state.contactForm
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        error,
        isValid: state.contactForm.isValid,
        onCancel: ownProps.onCancel,

    }
}

export default connect(mapStateToProps, { createContact, clearContactForm })(CreateContactScreen)