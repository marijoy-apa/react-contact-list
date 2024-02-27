import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Spacer from './Spacer';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
const SnackbarError = (props) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    useEffect(() => {
        if (props.error) {
            setSnackbarVisible(true);
        }
    }, [props.error]);

    const onDismissSnackbar = () => {
        setSnackbarVisible(false);
        // onDismiss();
    }

    // const renderSnackBar = () => {
    //     if (props.error) {
    //         setSnackbarVisible(true)
    //         return
    //     }
    // }

    return (<Snackbar
        style={{}}
        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        duration={3000}
        action={{
            icon: (() => <Ionicons name="close-circle" color='grey' size={20} />),
            onPress: onDismissSnackbar,

        }} >{props.error}
    </Snackbar>


    );
};

// const styles = StyleSheet.create({
//     optionContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     text: {
//         color: 'grey'
//     },
//     icon: {
//         color: 'grey'

//     }
// });

mapStateToProps = (state, ownProps) => {
    return {
        error: state.contactForm.error,
        onDismiss: ownProps.onDismiss
    }

}



export default connect(mapStateToProps)(SnackbarError);
