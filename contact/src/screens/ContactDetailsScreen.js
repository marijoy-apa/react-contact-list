import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContactIcons from "../components/contactDetailsPage/ContactIcons";
import PhoneNumbers from "../components/contactDetailsPage/PhoneNumbers";
import AddEmergencyButton from "../components/createContactPage/AddEmergencyButton";
import NotesDetails from "../components/contactDetailsPage/NotesDetails";
import { updateEmergencyContact, contactFormFillout, validateForm } from "../actions";
import { TouchableOpacity } from "react-native-gesture-handler";
const ContactDetailsScreen = (props) => {
    const { id } = useRoute().params
    const item = props.contactList.find(contact => contact.id === id)
    const navigation = useNavigation();

    useEffect(() => {
        console.log('use effect in contact details is executed', item.phone
        )
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Edit Contact Screen', { id: item.id });
                        props.contactFormFillout(item);

                    }}>
                    <Text style={{ color: '#007AFF', marginRight: 12 }}>
                        Edit</Text></TouchableOpacity>
            )
        })
    }, [item])

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
            <ContactIcons phone={item.phone}/>
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
    }
}



export default connect(mapStateToProps, { updateEmergencyContact, contactFormFillout, validateForm })(ContactDetailsScreen)