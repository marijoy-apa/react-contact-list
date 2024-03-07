import '@react-navigation/native'
import { combineReducers } from 'redux';
import { cleanup } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';

import { contactFetch } from '../../../src/actions';
import { onValue } from 'firebase/database';
import { onValueList, transformedListData } from '../../data/contactList';
import reduxStore from '../../store/reduxStore';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
    update: jest.fn(),
    push: jest.fn(),
    remove: jest.fn()
}));

describe('fetch contact list', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('is Fetching property should be true when contact fetch start', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
        })
        store.dispatch(contactFetch())
        const state = store.getState();
        expect(state.contactList.isFetching).toBe(true)
    })
    test('contact fetch success should be called for successful fetch', async () => {
        const mockSnapshot = {
            val: jest.fn(() => (onValueList)),
        };
        onValue.mockImplementationOnce((_, callback) => {
            callback(mockSnapshot)
        })

        const store = reduxStore

        store.dispatch(contactFetch())

        const listData = transformedListData

        const state = store.getState();
        expect(state.contactList.isFetching).toBe(false)
        expect(state.contactList.list).toStrictEqual(listData)
    })

    test('empty array when null snapshot value', async () => {
        const mockSnapshot = {
            val: jest.fn(() => (null)),
        };

        onValue.mockImplementationOnce((_, callback) => {
            callback(mockSnapshot)
        })
        const store = reduxStore

        store.dispatch(contactFetch())

        const state = store.getState();
        expect(state.contactList.isFetching).toBe(false)
        expect(state.contactList.list).toStrictEqual([])
    })

    test('contact fetch fail should be called when fail fetch', async () => {
        consoleErrorSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        onValue.mockImplementationOnce((_, callback) => {
            try {
                throw new Error('Mock fetch error');
            } catch (error) {
                callback();
            }
        });

        const store = reduxStore
        store.dispatch(contactFetch())

        const state = store.getState();
        expect(state.contactList.error).toBe('Something went wrong. Please try again later.')
    })
})