import { CLEAR_CONTACT_FORM, CONTACT_FORM_FILLOUT, CONTACT_FORM_UPDATE, CONTACT_FORM_VALIDATE, CREATE_NEW_CONTACT } from "./types"
import { getDatabase, push, ref, update, remove } from 'firebase/database'


export const contactFormUpdate = ({ prop, value }) => {
    console.log('contact from update', prop, value)
    return (dispatch) => {
        dispatch({
            type: CONTACT_FORM_UPDATE,
            payload: { prop, value }
        })
        dispatch(validateForm())
    }
}

export const createContact = ({ firstName, lastName, phone, notes, emergencyContact, image }) => {
    return (dispatch) => {
        console.log('push details', firstName)
        const validPhoneNum = filterValidPhoneNumber(phone)

        const reference = ref(getDatabase(), 'contact-list');
        push(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image })
            .then(() => {
                console.log('perfect')
                dispatch({ type: CLEAR_CONTACT_FORM })
            })
            .catch((error => {
                console.log(error)
            }))
    }
}

export const updateContact = ({ id, firstName, lastName, phone, notes, emergencyContact, image }) => {
    return (dispatch) => {
        const validPhoneNum = filterValidPhoneNumber(phone)

        const reference = ref(getDatabase(), `contact-list/${id}`);
        update(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image }).then(() => {
            console.log('update Contact')
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


export const validateForm = () => {
    return (dispatch, getState) => {
        const { firstName, lastName, phone } = getState().contactForm;

        const isValidName = firstName.trim() !== '' || lastName.trim() !== ''
        const isValidPhone = phone.some((item => item.digit.trim() !== ""
            && /^\d+$/.test(item.digit.trim())))

        const isValid = isValidName && isValidPhone
        console.log('validate form ', isValid)

        dispatch({ type: CONTACT_FORM_VALIDATE, payload: isValid })
    }
}

export const contactFormFillout = (item) => {
    console.log('FILLOUT', item)
    return (dispatch) => {
        dispatch({
            type: CONTACT_FORM_FILLOUT,
            payload: item
        })
    }
}


const filterValidPhoneNumber = (phoneList) => {
    const validList = phoneList.filter(item => {
        const isValidPhone = item.digit.trim() !== "" && /^\d+$/.test(item.digit.trim())
        return isValidPhone;
    })

    console.log('valid phone number list', validList)
    return validList;
}