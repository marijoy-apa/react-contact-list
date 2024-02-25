import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native'
import { connect } from "react-redux";
import ContactForm from "../components/createContactPage/ContactForm";
import { contactFormUpdate, contactFormFillout } from "../actions";
const EditContactScreen = (props) => {
    // const { id } = useRoute().params
    // const item = props.contactList.find(contact => contact.id === id)

    // useEffect(() => {
    //     console.log('item', item)
    //     // props.contactFormFillout(item)
    // }, [])
    return (
        <ContactForm />
    )
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state, ownProps) => {
    return {
        contactList: state.contactList.list,
    }
}

export default connect(mapStateToProps, { contactFormUpdate, contactFormFillout })(EditContactScreen)