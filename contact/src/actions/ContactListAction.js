import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { CONTACT_FETCH_FAIL, CONTACT_FETCH_START, CONTACT_FETCH_SUCCESS } from "./types";

export const contactFetch = () => {
    return (dispatch) => {
        dispatch({ type: CONTACT_FETCH_START })

        //get contact data ordered by firstName
        const reference = query(
            ref(getDatabase(), 'contact-list'),
            orderByChild('firstName'),
        );
        onValue(reference, (snapshot) => {
            try {
                //check if path exist
                if (!snapshot.exists()) {
                    throw new Error("Path does not exist")
                }
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


