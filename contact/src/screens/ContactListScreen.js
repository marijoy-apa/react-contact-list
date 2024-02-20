import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import SearchBar from '../components/SearchBar'
import ContactItem from '../components/ContactItem'
import CreateContactScreen from "./CreateContactScreen";
import { FAB, BottomSheet } from 'react-native-elements'
const ContactListScreen = ({ navigation }) => {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    const List = [{ name: 'name1', id: '1' }, { name: 'name2', id: '2' }, { name: 'name3', id: '3' }]

    const navigateContactDetilsScreen = () => {

        navigation.navigate('Contact Details')
    }

    return (
        <View style={styles.container}>
            <SearchBar />
            <TouchableOpacity onPress={navigateContactDetilsScreen}>
                <FlatList
                    data={List}
                    keyExtractor={(contact) => contact.id}
                    renderItem={({ item }) => <ContactItem item={item} />}
                />
            </TouchableOpacity>
            <BottomSheet isVisible={bottomSheetVisible} snapPoints={[0, '50%', '90%']}>

                <CreateContactScreen onCancel={() => {
                    console.log('false')
                    setBottomSheetVisible(false)}}/>
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
        marginTop: 80,
        flex: 1,
        backgroundColor: 'white',
        height: 700,
    }

})

ContactListScreen.options = {
    headerShown: false,
    // tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={20} color={color} />)
}

export default ContactListScreen