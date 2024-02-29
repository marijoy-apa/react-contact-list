import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'
import { FAB, BottomSheet } from 'react-native-elements'
import { connect } from "react-redux";
import { contactFetch } from "../actions";

import initializeFirebaseApp from '../initializeFirebaseApp'
import NoContactsMessage from "../components/contactListPage/NoContactsMessage";
import NoSearchResult from "../components/contactListPage/NoSearchResult";
import ErrorMessage from "../components/contactListPage/ErrorMessage";
import SnackbarError from "../components/common/SnackbarError";
import SearchBar from '../components/contactListPage/SearchBar'
import ContactItem from '../components/contactListPage/ContactItem'
import CreateContactScreen from "./CreateContactScreen";
import { useTheme } from "react-native-paper";

const ContactListScreen = (props) => {
    const { colors } = useTheme()
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    useEffect(() => {
        initializeFirebaseApp();
        props.contactFetch();
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
                <NoContactsMessage contactText="Contacts" />
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

    const onCancelCreate = () => {
        setBottomSheetVisible(false)
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.surface}]}>
            <SearchBar />
            {renderItems()}

            <BottomSheet isVisible={bottomSheetVisible} containerStyle={styles.bottomSheet}>
                <CreateContactScreen onCancel={onCancelCreate} />
            </BottomSheet>

            <FAB color="grey" icon={{ name: 'add', color: 'white' }} placement="right" onPress={() => { setBottomSheetVisible(true) }} />
            <SnackbarError onDismiss={null} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%', 

    },
})

ContactListScreen.options = {
    headerShown: false,
}

const mapStateToProps = (state, ownProps) => {
    const filteredData = state.contactList.list.filter(item => {
        const fullName = item.firstName.toLowerCase() + " " + item.lastName.toLowerCase();
        return fullName.includes(state.searchKeyword.toLowerCase()
        )
    })

    return {
        contactList: filteredData,
        navigation: ownProps.navigation,
        searchKeyword: state.searchKeyword,
        isFetching: state.contactList.isFetching,
        error: state.contactList.error
    }
}

export default connect(mapStateToProps, { contactFetch })(ContactListScreen)