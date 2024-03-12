/**
 * @jest-environment node
 */

import { } from '@react-navigation/native'
import { combineReducers } from 'redux';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import EmergencyListScreen from '../../../src/screens/EmergencyListScreen';
import { renderProviderComponent } from '../../__utils__/renderNavigationComponent';


import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';

import mockReducer from '../../__utils__/mockReducer';


import { deleteContact, updateEmergencyContact } from '../../../src/actions'; import { renderContactList, renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { emergencyList } from '../../data/emergencyList';
jest.useFakeTimers();
jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
    update: jest.fn(),
    remove: jest.fn().mockResolvedValue()
}));
jest.mock('../../../src/actions', () => ({
    ...jest.requireActual('../../../src/actions'),
    updateEmergencyContact: jest.fn().mockReturnValue({ type: 'nothing' }),
    clearContactForm: jest.fn().mockReturnValue({ type: 'CLEAR_CONTACT_FORM' }),
    deleteContact: jest.fn().mockReturnValue({ type: 'CLEAR_CONTACT_FORM' }),


}))
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}))

const mockNavigate = jest.fn()
const Stack = createStackNavigator();

const emergencyListScreen = <Stack.Screen name="Contact List" component={EmergencyListScreen} />

describe('<Contact List App/>', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('Contact List renders correctly', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
        })
        renderNavigationComponent(emergencyListScreen, store)

        const searchBar = screen.getByPlaceholderText('Search');

        expect(searchBar).toBeTruthy();
    })


    test('renders activity indicator when fetching data', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)
        const activityIndicator = screen.getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    })

    test('renders error message when there are error', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [],
            error: 'Something went wrong'
        })
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: SearchItemReducer,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)

        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toBeTruthy();
    })

    test('render No Contacts available when the list is empty', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [],
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('')

        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),
        })
        renderNavigationComponent(emergencyListScreen, store)

        const errorMessage = screen.getByTestId('no-contact-message');
        expect(errorMessage).toBeTruthy();
    })

    test('render contact is not available when there is no contact', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [],
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('Not available')
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),
        })
        renderNavigationComponent(emergencyListScreen, store)

        const errorMessage = screen.getByTestId('no-search-result');
        expect(errorMessage).toBeTruthy();
    })
    test('render list of contact item', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [{
                firstName: 'test',
                lastName: 'last',
                id: '1',
                phone: [{ type: 'Phone', digit: '324342' },
                { type: 'Phone', digit: '231312' }],
                notes: '',
                emergencyContact: true,
                image: 'testImage'
            }],
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('')
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)

        const contactList = screen.getByTestId('emergency-list');
        expect(contactList).toBeTruthy();
    })

    test('correct emergency icon should be rendered', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: emergencyList,
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('')
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)

        const emergencyButton = screen.getByTestId('emergency-icon-1');
        expect(emergencyButton).toBeTruthy();

    })


    test('should be able to click Emergency button', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: emergencyList,
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('')
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)

        const emergencyButton = screen.getByTestId('emergency-button-1');
        expect(emergencyButton).toBeTruthy();

        fireEvent.press(emergencyButton);
        expect(updateEmergencyContact).toHaveBeenCalled();
    })

    test('should be able to delete contact item', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: emergencyList,
            error: ''
        })

        const mockReducerSearchKeyword = mockReducer('')

        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(emergencyListScreen, store)

        const deleteButton = screen.getByTestId('delete-button-1');
        expect(deleteButton).toBeTruthy();

        fireEvent.press(deleteButton);
        expect(deleteContact).toHaveBeenCalled();


    })

    test('should navigate to Contact Details page when contact item is called', async () => {


        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: emergencyList,
            error: ''
        })
        const mockReducerSearchKeyword = mockReducer('')

        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: mockReducerContactList,
                searchKeyword: mockReducerSearchKeyword,
            }),
        })
        renderNavigationComponent(emergencyListScreen, store)

        const contactItem = screen.getByTestId('contact-item-1');
        expect(contactItem).toBeTruthy();

        fireEvent.press(contactItem);
        expect(mockNavigate).toHaveBeenCalled();
    })

})