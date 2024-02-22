import { CLEAR_SEARCH_ITEM, SET_SEARCH_ITEM } from "./types"

export const setSearchItem = (value) => {
    console.log('set seasrchITEm', value)
    return {
        type: SET_SEARCH_ITEM,
        payload: value
    }
}

export const clearSearchItem = (value) => {
    console.log('clearSearch Item')
    return {
        type: CLEAR_SEARCH_ITEM,
    }
}