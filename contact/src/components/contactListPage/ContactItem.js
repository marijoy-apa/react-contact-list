import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { deleteContact, updateEmergencyContact, filterList } from "../../actions";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
// ContactItem component renders a single contact item in the list
const ContactItem = (props) => {
    const {colors} = useTheme();
    // Retrieve contact details from the Redux state
    const item = props.contactList.find(contact => contact.id === props.item.id)
    const navigation = useNavigation();
    const fullName = (item.firstName + " " + item.lastName).slice(0, 25)

    const onPressDelete = () => {
        props.deleteContact(item.id)
    }

    const onPressEmergencyButton = () => {
        props.updateEmergencyContact(item.id, !item.emergencyContact)
    }

    const onPressContactItem = () => {
        navigation.navigate('Contact Details', { id: item.id })
    }

    const renderEmergencyIcon = () => {
        props.item.emergencyContact === true;
        return (
            <TouchableOpacity onPress={onPressEmergencyButton} testID={`emergency-button-${item.id}`}>
                {item.emergencyContact ? (
                    <MaterialIcons name="emergency" style={styles.isEmergency} testID={`emergency-icon-${item.id}`}/>
                ) : (
                    <Ionicons name="medical-outline" style={[styles.isNotEmergency, {color: colors.onSecondary}]} testID={`is-not-emergency-icon-${item.id}`} />
                )}
            </TouchableOpacity>
        )
    }


    return (
        <TouchableOpacity onPress={onPressContactItem} testID={`contact-item-${item.id}`}>
            <View style={[styles.container, {borderColor: colors.onSecondary}]}>
                <Text style={[styles.nameText, {color: colors.onSecondary}]}>{fullName}</Text>
                <View style={styles.iconContainer}>
                    {renderEmergencyIcon()}
                </View>
                <TouchableOpacity onPress={onPressDelete} testID={`delete-button-${item.id}`}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons
                            name="delete-outline"
                            style={[styles.icon, {color: colors.onSecondary}]} />
                    </View>
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
        borderBottomWidth: 0.3, 
        
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

    },
    iconContainer: {
        // backgroundColor: 'blue', 
        padding: 10,
        paddingLeft: 5,
    }
})


const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.item,
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