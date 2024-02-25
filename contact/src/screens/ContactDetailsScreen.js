import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContactIcons from "../components/contactDetailsPage/ContactIcons";
import PhoneNumbers from "../components/contactDetailsPage/PhoneNumbers";
import AddEmergencyButton from "../components/createContactPage/AddEmergencyButton";
import NotesDetails from "../components/contactDetailsPage/NotesDetails";
import { updateEmergencyContact } from "../actions";
import { TouchableOpacity } from "react-native-gesture-handler";
const ContactDetailsScreen = (props) => {
    const { id } = useRoute().params
    const item = props.contactList.find(contact => contact.id === id)
    const navigation = useNavigation();

    useEffect(() => {
        props.navigation.setOptions({

            headerRight: () => (
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Edit Contact Screen', { id: item.id }) }}
                ><Text>
                        Edit</Text></TouchableOpacity>
            )
        })
    }, [])



    const renderContactNumber = () => {
        console.log(item)
        var contactDetail = []
        for (let index = 0; index < item.phone.length; index++) {
            var isLast = index === item.phone.length - 1
            console.log(isLast)
            const itemDetail = item.phone[index];
            contactDetail.push(<PhoneNumbers
                item={itemDetail}
                isLast={isLast}
                key={index} />)
        }
        return contactDetail;
    }


    const onPressEmergencyButton = () => {
        props.updateEmergencyContact(item.id, !item.emergencyContact)
    }
    return (
        <View style={styles.container}>
            <Image
                source={item.image ? { uri: item.image } : null}
                style={styles.imageStyle} />
            <Text>{item.firstName} {item.lastName}</Text>
            <ContactIcons />
            <View style={styles.contactNumContainer}>
                {renderContactNumber()}
            </View>
            <NotesDetails notes={item.notes} />
            <AddEmergencyButton isEmergency={item.emergencyContact} onPress={onPressEmergencyButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // justifyContent: 'center', 
        alignItems: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
    },
    contactNumContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        borderRadius: 12,
    }
})

ContactDetailsScreen.options = {

    headerTitle: ''
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state.contactList.list)
    return {
        contactList: state.contactList.list,
        // navigation: ownProps.navigation
    }
}



export default connect(mapStateToProps, { updateEmergencyContact })(ContactDetailsScreen)