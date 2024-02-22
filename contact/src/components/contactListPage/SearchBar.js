import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { setSearchItem, clearSearchItem } from "../../actions";

const SearchBar = (props) => {

    const onInputSearch = (value) => {
        props.setSearchItem(value)
    }

    const onPressCancelButton = () => {
        props.clearSearchItem()
    }

    const renderCloseCircle = () => {
        return props.searchKeyword ? <TouchableOpacity onPress={onPressCancelButton}>
            <Ionicons name="close-circle" style={styles.xbutton} />
        </TouchableOpacity> : null
    }

    return (
        <View style={styles.container}>
            <FontAwesome name="search" style={styles.searchButton} />
            <TextInput placeholder="Search" style={styles.textInput} value={props.searchKeyword} onChangeText={onInputSearch} />
            {props.searchKeyword ? <TouchableOpacity onPress={onPressCancelButton}>
                <Ionicons name="close-circle" style={styles.xbutton} />
            </TouchableOpacity> : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgray',
        height: 40,
        borderRadius: 13,
        paddingHorizontal: 20
    },
    searchButton: {
        fontSize: 23,
        color: 'darkgrey'
    },

    textInput: {
        marginLeft: 20,
        flex: 1
    },
    xbutton: {
        fontSize: 23,
        color: 'darkgrey'
    }

})

SearchBar.options = {


    headerTitle: ''
}

const mapStateToProps = (state) => {
    return { searchKeyword: state.searchKeyword }
}



export default connect(mapStateToProps, { setSearchItem, clearSearchItem })(SearchBar)