import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { CONTACT_FETCH_START, CONTACT_FETCH_SUCCESS } from "./types";

export const contactFetch = () => {
    return (dispatch) => {
        dispatch({ type: CONTACT_FETCH_START })
        const reference = query(
            ref(getDatabase(), 'contact-list'),
            orderByChild('firstName'),
        );
        onValue(reference, (snapshot) => {
            var contactList = []
            if (snapshot.val() !== null) {
                contactList = convertContactListObject(snapshot.val());
            }
            dispatch({
                type: CONTACT_FETCH_SUCCESS,
                payload: contactList
            })
        })
    }
}


const convertContactListObject = (value) => {
    const contactList = Object.entries(value)
        .map(([id, data]) => ({ id, ...data }))
    return contactList
}


