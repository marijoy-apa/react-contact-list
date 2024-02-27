import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { clearFormError } from '../../actions';

//Component that displays error message when there are form update errors
const SnackbarError = (props) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    //to show the Snackbar when there is a form error
    useEffect(() => {
        console.log('SNACKBAR USE STATE', props.error)
        if (props.error) {
            console.log('setting snackbar true')
            setSnackbarVisible(true);
        }
    }, [props.error]);

    //dismiss the Snackbar and clear the form error
    const onDismissSnackbar = () => {
        setSnackbarVisible(false);
        props.clearFormError();
    }

    return (<Snackbar
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

mapStateToProps = (state) => {
    return {
        error: state.contactForm.error,
    }
}

export default connect(mapStateToProps, {clearFormError})(SnackbarError);
