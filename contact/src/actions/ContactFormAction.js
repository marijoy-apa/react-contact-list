import { CONTACT_FORM_UPDATE } from "./types"
import { getDatabase, push, ref } from 'firebase/database'

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
        })
    }
}