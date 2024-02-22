import { CONTACT_FETCH_START, CONTACT_FETCH_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
    list: [],
    isFetching: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_FETCH_SUCCESS:
            return { list: action.payload, isFetching: false }
        case CONTACT_FETCH_START:
            return { ...state, isFetching: true }
        default:
            return state
    }
}