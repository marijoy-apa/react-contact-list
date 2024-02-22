import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { CONTACT_FETCH_SUCCESS } from "./types";

export const contactFetch = () => {
    return (dispatch, getState) => {
        const reference = query(
            ref(getDatabase(), 'contact-list'),
            orderByChild('firstName'),
        );
        onValue(reference, (snapshot) => {
            contactList = convertContactListObject(snapshot.val())
            console.log('contactlist value', contactList)
            const searchItem = getState().searchKeyword
            console.log('search item', searchItem)
            const filterList = filterSearchItems(contactList, searchItem)
            // console.log('filter list', filterList)
            dispatch({
                type: CONTACT_FETCH_SUCCESS,
                payload: contactList
            })

        })

    }
}

export const fetchFilteredList = () => {


}

const convertContactListObject = (value) => {
    const contactList = Object.entries(value)
        .map(([id, data]) => ({ id, ...data }))
    return contactList
}

const filterSearchItems = (list, searchItem) => {
    console.log('filterSearch item', list, searchItem)
    const filteredData = list.filter(item => item.firstName.includes(searchItem))
    // return filteredData;
    return []


}

