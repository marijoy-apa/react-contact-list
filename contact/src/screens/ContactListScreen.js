import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'
import SearchBar from '../components/contactListPage/SearchBar'
import ContactItem from '../components/contactListPage/ContactItem'
import CreateContactScreen from "./CreateContactScreen";
import { FAB, BottomSheet } from 'react-native-elements'
import { connect } from "react-redux";
import { contactFetch } from "../actions";
import initializeFirebaseApp from '../initializeFirebaseApp'
import NoContactsMessage from "../components/contactListPage/NoContactsMessage";
import NoSearchResult from "../components/contactListPage/NoSearchResult";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "../components/contactListPage/ErrorMessage";
import { Snackbar } from "react-native-paper";
import SnackbarError from "../components/common/SnackbarError";
const ContactListScreen = (props) => {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
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
        <View style={styles.container}>
            <SearchBar />
            {renderItems()}

            <BottomSheet isVisible={bottomSheetVisible} containerStyle={styles.bottomSheet}>
                <CreateContactScreen onCancel={onCancelCreate} />
            </BottomSheet>

            <FAB color="grey" icon={{ name: 'add', color: 'white' }} placement="right" onPress={() => { setBottomSheetVisible(true) }} />
            <SnackbarError onDismiss={null}/>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
})

ContactListScreen.options = {
    headerShown: false,
}

const mapStateToProps = (state, ownProps) => {

    const filteredData = state.contactList.list.filter(item =>
        item.firstName.toLowerCase().includes(state.searchKeyword.toLowerCase()))
    return {
        contactList: filteredData,
        navigation: ownProps.navigation,
        searchKeyword: state.searchKeyword,
        isFetching: state.contactList.isFetching,
        error: state.contactList.error
    }
}

export default connect(mapStateToProps, { contactFetch })(ContactListScreen)