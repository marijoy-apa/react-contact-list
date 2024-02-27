import {
    CLEAR_SEARCH_ITEM,
    SET_SEARCH_ITEM
} from '../actions/types'

const INITIAL_STATE = ''

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SEARCH_ITEM:
            return action.payload
        case CLEAR_SEARCH_ITEM:
            return INITIAL_STATE
        default:
            return state
    }
}