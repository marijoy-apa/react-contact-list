import { CONTACT_FETCH_SUCCESS, CONTACT_FORM_UPDATE, CREATE_NEW_CONTACT } from "./types"
import { getDatabase, push, ref, onValue } from 'firebase/database'

export const contactFormUpdate = ({ prop, value }) => {
    return {
        type: CONTACT_FORM_UPDATE,
        payload: { prop, value }
    }
}

export const createContact = ({ firstName, lastName, phone, notes, emergencyContact, image }) => {
    return (dispatch) => {
        const reference = ref(getDatabase(), 'contact-list');
        push(reference, { firstName, lastName, phone, notes, emergencyContact, image }).then(() => {
            console.log('perfect')
            dispatch({ type: CREATE_NEW_CONTACT });
        })
    }
}

export const contactFetch = () => {
    return (dispatch) => {
        const reference = ref(getDatabase(), 'contact-list');

        onValue(reference, (snapshot) => {
            console.log('snapshot value', snapshot.val())
            dispatch({
                type: CONTACT_FETCH_SUCCESS,
                payload: snapshot.val()
            })

        })

    }
}