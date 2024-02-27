import ErrorMessage from "../components/contactListPage/ErrorMessage"
import { CLEAR_CONTACT_FORM, CLEAR_CONTACT_FORM_ERROR, CONTACT_FORM_ERROR, CONTACT_FORM_FILLOUT, CONTACT_FORM_UPDATE, CONTACT_FORM_VALIDATE, CREATE_NEW_CONTACT } from "./types"
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
        return new Promise((resolve) => {
            const validPhoneNum = filterValidPhoneNumber(phone)
            const reference = ref(getDatabase(), 'contact-list');

            push(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image })
                .then(() => {
                    dispatch({ type: CLEAR_CONTACT_FORM })
                    resolve(true)
                })
                .catch((error => {
                    console.log('Error on create new contact', error)
                    dispatch({ type: CONTACT_FORM_ERROR, payload: 'Unable to create new contact.' })
                    resolve(false)
                }))
        })
    }
}

export const updateContact = ({ id, firstName, lastName, phone, notes, emergencyContact, image }) => {
    return (dispatch) => {
        return new Promise((resolve) => {
            const validPhoneNum = filterValidPhoneNumber(phone)
            const reference = ref(getDatabase(), `contact-list/${id}`);

            update(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image })
                .then(() => {
                    dispatch({ type: CLEAR_CONTACT_FORM })
                    resolve(true)
                })
                .catch((error) => {
                    console.log('error on update contact', error)
                    dispatchErrorWithTimeout(dispatch, 'Unable to update contact.')
                    resolve(false)
                })
        })
    }
}

export const updateEmergencyContact = (id, emergencyContact) => {
    return (dispatch) => {
        const reference = ref(getDatabase(), `contact-list/${id}`);
        update(reference, { emergencyContact })
            .catch((error) => {
                console.log('error on updating emergency contact', error)
                dispatchErrorWithTimeout(dispatch, 'Unable to update contact.')
            })
    }
}

export const deleteContact = (id) => {
    return (dispatch) => {
        console.log('removing item', id)
        const reference = ref(getDatabase(), `contact-list/${id}`);
        remove(reference)
            .catch((error) => {
                console.log('error on deleting contact', error)
                dispatchErrorWithTimeout(dispatch, 'Unable to delete contact.')
            })
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

    return validList;
}

const dispatchErrorWithTimeout = (dispatch, errorMessage) => {
    console.log('i am called error')
    dispatch({ type: CONTACT_FORM_ERROR, payload: errorMessage });

    setTimeout(() => {
        dispatch({ type: CLEAR_CONTACT_FORM_ERROR })
    }, 4000);

}