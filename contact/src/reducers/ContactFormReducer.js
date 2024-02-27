import { CLEAR_CONTACT_FORM, CLEAR_CONTACT_FORM_ERROR, CONTACT_FORM_ERROR, CONTACT_FORM_FILLOUT, CONTACT_FORM_UPDATE, CONTACT_FORM_VALIDATE, CREATE_NEW_CONTACT } from "../actions/types";


const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: [{ type: 'Phone', digit: '' }],
    notes: '',
    emergencyContact: false,
    image: null,
    isValid: false,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    console.log('ACtiON VALUES', action);
    console.log('STATE VALUES', state)
    switch (action.type) {
        case CONTACT_FORM_UPDATE:
            console.log('on update contact form', action, state)
            return { ...state, [action.payload.prop]: action.payload.value }
        case CLEAR_CONTACT_FORM:
            console.log('clear contact form')
            return INITIAL_STATE
        case CONTACT_FORM_FILLOUT:
            console.log('fillout contact form')
            return { ...state, ...action.payload }
        case CLEAR_CONTACT_FORM_ERROR:
            return { ...state, error: null }
        case CONTACT_FORM_VALIDATE:
            return { ...state, isValid: action.payload }
        case CONTACT_FORM_ERROR:
            console.log('contact form error set')
            return { ...state, error: action.payload }
        default:
            console.log('default action type is called', action.type)
            return state;
    }
}