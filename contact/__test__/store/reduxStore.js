import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ContactFormReducer from "../../src/reducers/ContactFormReducer";
import ContactListReducer from "../../src/reducers/ContactListReducer";
import SearchItemReducer from "../../src/reducers/SearchItemReducer";

const mockReduxStore = ({ mockContactForm = ContactFormReducer,
    mockContactList = ContactListReducer,
    mockSearchKeyword = SearchItemReducer } = {}) => configureStore({
        reducer: combineReducers({
            contactForm: mockContactForm,
            contactList: mockContactList,
            searchKeyword: mockSearchKeyword,
        }),

    })

export default mockReduxStore;