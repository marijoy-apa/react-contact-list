import { combineReducers } from "redux";
import ContactFormReducer from "./ContactFormReducer";
import ContactListReducer from './ContactListReducer'

export default combineReducers({
    contactForm: ContactFormReducer,
    contactList: ContactListReducer
})