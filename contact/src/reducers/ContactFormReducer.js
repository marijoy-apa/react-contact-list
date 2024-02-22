import { CLEAR_CONTACT_FORM, CONTACT_FORM_UPDATE, CREATE_NEW_CONTACT } from "../actions/types";


const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: [],
    notes: '',
    emergencyContact: false,
    image: ''
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
        default:
            console.log('i am called')
            return state;
    }
}