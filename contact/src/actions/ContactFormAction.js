import { CLEAR_CONTACT_FORM, CONTACT_FETCH_SUCCESS, CONTACT_FORM_UPDATE, CREATE_NEW_CONTACT } from "./types"
import { getDatabase, push, ref, onValue, query, update, orderByChild, limitToFirst, remove } from 'firebase/database'


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
            dispatch({ type: CLEAR_CONTACT_FORM })
        })
    }
}



export const updateEmergencyContact = (id, emergencyContact) => {
    return () => {
        const reference = ref(getDatabase(), `contact-list/${id}`);
        update(reference, { emergencyContact });
    }
}

export const deleteContact = (id) => {
    return () => {
        console.log('removing item', id)
        const reference = ref(getDatabase(), `contact-list/${id}`);
        remove(reference);
    }
}

export const clearContactForm = () => {
    return {
        type: CLEAR_CONTACT_FORM
    }
}

// export const filterList = () => {
//     return (dispatch, getState) => {
//         console.log('hello world')
//         const searchItem = getState().searchKeyword
//         console.log('searchItem', searchItem)
//         // return {}
//     }
// }

