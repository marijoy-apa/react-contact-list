import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContactIcons from "../components/contactDetailsPage/ContactIcons";
import PhoneNumbers from "../components/contactDetailsPage/PhoneNumbers";
import AddEmergencyButton from "../components/createContactPage/AddEmergencyButton";
import NotesDetails from "../components/contactDetailsPage/NotesDetails";
import { updateEmergencyContact, contactFormFillout, updateError } from "../actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import SnackbarError from "../components/common/SnackbarError";


const ContactDetailsScreen = (props) => {

    const { id } = useRoute().params
    const item = props.contactList.find(contact => contact.id === id)
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight
        })
    }, [item])

    const headerRight = () => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Edit Contact Screen', { id: item.id });
                props.contactFormFillout(item);
            }}>
            <Text style={{ color: '#007AFF', marginRight: 12 }}>Edit</Text>
        </TouchableOpacity>
    )

    const renderContactNumber = () => {
        var contactDetail = []
        for (let index = 0; index < item.phone.length; index++) {
            var isLast = index === item.phone.length - 1
            const itemDetail = item.phone[index];
            contactDetail.push(<PhoneNumbers
                item={itemDetail}
                isLast={isLast}
                key={index} />)
        }
        return contactDetail;
    }

    const renderImage = () => {
        if (item.image) {
            return <Image
                source={{ uri: item.image }}
                style={styles.imageStyle} />
        } else {
            return <View style={styles.imageContainer}>
                <Text style={styles.textImage}>{item.firstName[0]}</Text>
            </View>
        }
    }

    const onPressEmergencyButton = () => {
        props.updateEmergencyContact(item.id, !item.emergencyContact)
    }
    return (
        <View style={styles.container}>
            {renderImage()}
            <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
            <ContactIcons phone={item.phone} onError={props.updateError} />
            <View style={styles.contactNumContainer}>
                {renderContactNumber()}
            </View>
            <NotesDetails notes={item.notes} />
            <AddEmergencyButton isEmergency={item.emergencyContact} onPress={onPressEmergencyButton} />
            <SnackbarError onDismiss={null} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
        marginTop: 100,
    },
    contactNumContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        borderRadius: 12,
    },
    contactName: {
        marginHorizontal: 80,
        textAlign: 'center',
        fontSize: 20,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textImage: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'grey'
    }
})

ContactDetailsScreen.options = {

    headerTitle: ''
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactList.list,
        error: state.contactForm.error,
    }
}



export default connect(mapStateToProps, { updateEmergencyContact, contactFormFillout, updateError })(ContactDetailsScreen)