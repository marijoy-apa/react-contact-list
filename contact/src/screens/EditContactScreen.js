import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet } from 'react-native'
import { connect } from "react-redux";

const EditContactScreen = (props) => {
    const { id } = useRoute().params
    const item = props.contactList.find(contact => contact.id === id)
    return (
        <View>
            <Text>{item.firstName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state, ownProps) => {
    return {
        contactList: state.contactList.list,
    }
}

export default connect(mapStateToProps)(EditContactScreen)