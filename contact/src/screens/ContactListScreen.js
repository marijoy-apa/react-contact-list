import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar'
import ContactItem from '../components/ContactItem'
import CreateContactScreen from "./CreateContactScreen";
import { FAB, BottomSheet } from 'react-native-elements'
import { connect } from "react-redux";
import { contactFetch } from "../actions";
import { initializeApp } from 'firebase/app'
const ContactListScreen = (props, { navigation }) => {
    useEffect(() => {
        initializeApp({
            apiKey: "AIzaSyBhdCJ2U0u9ZBWmCqPX1nuENNdiMaBbwbg",
            authDomain: "react-native-contact-c572e.firebaseapp.com",
            databaseURL: "https://react-native-contact-c572e-default-rtdb.firebaseio.com",
            projectId: "react-native-contact-c572e",
            storageBucket: "react-native-contact-c572e.appspot.com",
            messagingSenderId: "402627763000",
            appId: "1:402627763000:web:39ae9796a6e7ae519bbfcd"
        })
        props.contactFetch();
        console.log('props contactList', props.contactList)
    }, [])

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    const List = [{ name: 'name1', id: '1' }, { name: 'name2', id: '2' }, { name: 'name3', id: '3' }]

    const navigateContactDetilsScreen = () => {
        console.log('navigate')
        props.navigation.navigate('Contact Details')
    }

    return (
        <View style={styles.container}>
            <SearchBar />
            <FlatList
                data={props.contactList}
                keyExtractor={(contact) => contact.id}
                renderItem={({ item }) =>
                    <ContactItem item={item} onPress={navigateContactDetilsScreen} />} />
            <BottomSheet isVisible={bottomSheetVisible} containerStyle={styles.bottomSheet}>
                <CreateContactScreen onCancel={() => {
                    console.log('false')
                    setBottomSheetVisible(false)
                }} />
            </BottomSheet>

            <FAB color="grey" icon={{ name: 'add', color: 'white' }} placement="right" onPress={() => { setBottomSheetVisible(true) }} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomSheet: {
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
        // marginTop: 80,
        // flex: 1,
        // backgroundColor: '#eae7e6',
        // height: 700,
    }
})

ContactListScreen.options = {
    headerShown: false,
}

const mapStateToProps = (state, ownProps) => {
    return {
        contactList: state.contactList,
        navigation: ownProps.navigation
    }

}

export default connect(mapStateToProps, { contactFetch })(ContactListScreen)