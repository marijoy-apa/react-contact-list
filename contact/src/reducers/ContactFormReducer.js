import { CONTACT_FORM_UPDATE } from "../actions/types";


const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: [],
    notes: '',
    emergencyContact: true,
    image: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_FORM_UPDATE:
            console.log('on update contact form update', action, state)
            return { ...state, [action.payload.prop]: action.payload.value }
        default:
            console.log('i am called')
            return state
    }
}