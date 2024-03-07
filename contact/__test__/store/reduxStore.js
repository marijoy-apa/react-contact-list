import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ContactFormReducer from "../../src/reducers/ContactFormReducer";
import ContactListReducer from "../../src/reducers/ContactListReducer";
import SearchItemReducer from "../../src/reducers/SearchItemReducer";

const reduxStore = configureStore({
    reducer: combineReducers({
        contactForm: ContactFormReducer,
        contactList: ContactListReducer,
        searchKeyword: SearchItemReducer,
    }),

})

export default reduxStore;