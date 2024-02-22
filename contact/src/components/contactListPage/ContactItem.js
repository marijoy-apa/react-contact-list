import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { deleteContact, updateEmergencyContact, filterList } from "../../actions";

const ContactItem = (props) => {
    const item = props.contactList.find(contact => contact.id === props.item.id)

    const renderEmergencyIcon = () => {
        props.item.emergencyContact === true;
        return (
            <TouchableOpacity onPress={onPressEmergencyButton}>{
                item.emergencyContact ?
                    <MaterialIcons
                        name="emergency"
                        style={styles.isEmergency} />
                    : <Ionicons name="medical-outline"
                        style={styles.isNotEmergency} />}
            </TouchableOpacity>
        )
    }

    const onPressDelete = () => {
        props.deleteContact(item.id)
    }

    const onPressEmergencyButton = () => {
        console.log(item)
        props.updateEmergencyContact(item.id, !item.emergencyContact)

    }


    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.nameText}>
                    {item.firstName}
                </Text>
                {renderEmergencyIcon()}
                <TouchableOpacity onPress={onPressDelete}>
                    <MaterialIcons
                        name="delete-outline"
                        style={styles.icon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 45,
        borderBottomWidth: 0.3
    },
    icon: {
        fontSize: 18,
        color: 'grey',
        marginHorizontal: 5
    },

    nameText: {
        flex: 1,
        color: 'grey'
    },
    xbutton: {
        fontSize: 23,
        color: 'grey',
    },
    isEmergency: {
        fontSize: 18,
        color: 'red'

    },
    isNotEmergency: {
        fontSize: 18,
        color: 'grey'

    }
})


const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.item,
        onPress: ownProps.onPress,
        contactList: state.contactList.list
    }
}

export default connect(mapStateToProps,
    {
        deleteContact,
        updateEmergencyContact,
        filterList
    })
    (ContactItem)