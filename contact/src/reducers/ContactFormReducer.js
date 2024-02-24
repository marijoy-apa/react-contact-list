import { CLEAR_CONTACT_FORM, CONTACT_FORM_UPDATE, CONTACT_FORM_VALIDATE, CREATE_NEW_CONTACT } from "../actions/types";


const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: [{ type: 'Phone', digit: '' }],
    notes: '',
    emergencyContact: false,
    image: null,
    isValid: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_FORM_UPDATE:
            console.log('on update contact form update', action, state)
            return { ...state, [action.payload.prop]: action.payload.value }
        case CREATE_NEW_CONTACT:
            console.log('new contact has been create');
            return state;
        case CLEAR_CONTACT_FORM:
            console.log('clear contact form')
            return INITIAL_STATE
        case CONTACT_FORM_VALIDATE:
            // console.log('validate form')
            return { ...state, isValid: action.payload }
        default:
            console.log('default action type is called', action.type)
            return state;
    }
}