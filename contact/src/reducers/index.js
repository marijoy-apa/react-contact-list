import { combineReducers } from "redux";
import ContactFormReducer from "./ContactFormReducer";

export default combineReducers({
    contactForm: ContactFormReducer,
})