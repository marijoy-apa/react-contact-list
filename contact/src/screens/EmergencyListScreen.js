import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import SearchBar from '../components/contactListPage/SearchBar'
import ContactItem from '../components/contactListPage/ContactItem'
import { connect } from "react-redux";
import { contactFetch } from "../actions";
import initializeFirebaseApp from '../initializeFirebaseApp'
import NoContactsMessage from "../components/contactListPage/NoContactsMessage";
import NoSearchResult from "../components/contactListPage/NoSearchResult";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "../components/contactListPage/ErrorMessage";
import SnackbarError from "../components/common/SnackbarError";
const EmergencyListScreen = (props) => {
    const navigation = useNavigation();
    useEffect(() => {
        initializeFirebaseApp();
        props.contactFetch();
        // navigation.setOptions({
        //     tabBarIcon: ({ color }) => (<FontAwesome name='phone' size={25} color={color} />),
        //     headerTitleAlign: "center",
        //     tabBarLabelStyle: { paddingBottom: 5, fontSize: 14 },
        //     tabBarStyle: { height: 90, padding: 10 }
        // })

    }, [])

    const navigateContactDetilsScreen = () => {
        props.navigation.navigate('Contact Details')
    }

    const renderItems = () => {
        if (props.isFetching) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>)
        } else if (props.error) {
            return (
                <ErrorMessage error={props.error} />)
        } else if (props.contactList.length === 0 && !props.searchKeyword) {
            return (
                <NoContactsMessage contactText="Emergency Contacts" />
            )

        } else if (props.contactList.length === 0) {
            return (
                <NoSearchResult searchKeyword={props.searchKeyword} />)

        } else {
            return (
                <FlatList
                    data={props.contactList}
                    keyExtractor={(contact) => contact.id}
                    renderItem={({ item }) =>
                        <ContactItem item={item} onPress={navigateContactDetilsScreen} />} />
            )
        }
    }


    return (
        <View style={styles.container}>
            <SearchBar />
            {renderItems()}
            <SnackbarError onDismiss={null} />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})


const mapStateToProps = (state, ownProps) => {

    const filteredData = state.contactList.list.filter(item =>
        item.firstName.toLowerCase().includes(state.searchKeyword.toLowerCase())
        && item.emergencyContact
    )

    return {
        contactList: filteredData,
        navigation: ownProps.navigation,
        searchKeyword: state.searchKeyword,
        error: state.contactList.error
    }
}

export default connect(mapStateToProps, { contactFetch })(EmergencyListScreen)