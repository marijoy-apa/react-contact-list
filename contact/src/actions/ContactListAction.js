import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { CONTACT_FETCH_FAIL, CONTACT_FETCH_START, CONTACT_FETCH_SUCCESS } from "./types";
import * as Network from 'expo-network';

export const contactFetch = () => {
    return async (dispatch) => {
        dispatch({ type: CONTACT_FETCH_START })

        const netInfo = await Network.getNetworkStateAsync();
        
        //check internet connection of user to provide error message 
        if (!netInfo.isConnected) {
            dispatch({
                type: CONTACT_FETCH_FAIL,
            }) 
        }
        //get contact data ordered by firstName
        const reference = query(
            ref(getDatabase(), 'contact-list'),
            orderByChild('firstName'),
        );
        onValue(reference, (snapshot) => {
            try {
                var contactList = []
                if (snapshot.val() !== null) {
                    contactList = convertContactListObject(snapshot.val());
                }
                dispatch({
                    type: CONTACT_FETCH_SUCCESS,
                    payload: contactList
                })
            } catch (error) {
                console.log(error);
                dispatch({
                    type: CONTACT_FETCH_FAIL,
                })
            }
        })
    }
}

// Helper function to convert a contact list object to a list, store in an object its property with its id
const convertContactListObject = (value) => {
    const contactList = Object.entries(value)
        .map(([id, data]) => ({ id, ...data }))
    return contactList
}


