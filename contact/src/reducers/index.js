import { combineReducers } from "redux";
import ContactFormReducer from "./ContactFormReducer";
import ContactListReducer from './ContactListReducer'
import SearchItemReducer from "./SearchItemReducer";

export default combineReducers({
    contactForm: ContactFormReducer,
    contactList: ContactListReducer,
    searchKeyword: SearchItemReducer,
})