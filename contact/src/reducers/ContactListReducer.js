import {
    CONTACT_FETCH_FAIL,
    CONTACT_FETCH_START,
    CONTACT_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    list: [],
    isFetching: true,
    error: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_FETCH_SUCCESS:
            return { list: action.payload, isFetching: false, error: null }
        case CONTACT_FETCH_START:
            return { ...state, isFetching: true, error: null }
        case CONTACT_FETCH_FAIL:
            return { ...state, isFetching: false, error: 'Something went wrong. Please try again later.' }
        default:
            return state
    }
}