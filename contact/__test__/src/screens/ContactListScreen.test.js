/**
 * @jest-environment node
 */

import '@react-navigation/native'
import { combineReducers } from 'redux';
import { cleanup, fireEvent, screen } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import ContactListScreen from '../../../src/screens/ContactListScreen';

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';

import mockReducer from '../../__utils__/mockReducer';

import { deleteContact, updateEmergencyContact } from '../../../src/actions';import { darkTheme } from '../../../src/theme/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
import { emergencyList, nonEmergencyList } from '../../data/emergencyList';

const Stack = createStackNavigator();
 
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
consoleErrorSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

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
const contactListScreen = <Stack.Screen name="Contact List" component={ContactListScreen} />

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
        renderNavigationComponent(contactListScreen, store)
 
        const searchBar = screen.getByPlaceholderText('Search');
        const fab = screen.getByTestId('fab');

        expect(searchBar).toBeTruthy();
        expect(fab).toBeTruthy();
    })

    test('opens bottom sheet when FAB is pressed', async () => {
 
        renderNavigationComponent(contactListScreen)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab)

        const bottomSheet = screen.getByTestId('bottom-sheet');
        expect(bottomSheet).toBeTruthy();
    })

    test('closees bottom sheet when Cancel is pressed', async () => {

        renderNavigationComponent(contactListScreen)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab)

        const cancelButton = screen.getByText('Cancel');
        fireEvent.press(cancelButton)
        const newBottomSheet = screen.queryByTestId('bottom-sheet');

        expect(newBottomSheet).toBeNull();
    })

    test('renders activity indicator when fetching data', async () => {

        renderNavigationComponent(contactListScreen)
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
        renderNavigationComponent(contactListScreen, store)

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
        renderNavigationComponent(contactListScreen, store)

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
        renderNavigationComponent(contactListScreen, store)

        const errorMessage = screen.getByTestId('no-search-result');
        expect(errorMessage).toBeTruthy();
    })
    test('render list of contact item', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [{ firstName: 'test', lastName: 'last', id: 1 }],
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
        renderNavigationComponent(contactListScreen, store)

        const contactList = screen.getByTestId('contact-list');
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
        renderNavigationComponent(contactListScreen, store)

        const emergencyButton = screen.getByTestId('emergency-icon-1');
        expect(emergencyButton).toBeTruthy();

    })


    test('should be able to click Emergency button', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: nonEmergencyList,
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
        renderNavigationComponent(contactListScreen, store)

        const emergencyButton = screen.getByTestId('emergency-button-1');
        expect(emergencyButton).toBeTruthy();

        fireEvent.press(emergencyButton);
        expect(updateEmergencyContact).toHaveBeenCalled();
    })

    test('should be able to delete contact item', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: nonEmergencyList,
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
        renderNavigationComponent(contactListScreen, store)

        const deleteButton = screen.getByTestId('delete-button-1');
        expect(deleteButton).toBeTruthy();

        fireEvent.press(deleteButton);
        expect(deleteContact).toHaveBeenCalled();


    })

    test('should navigate to Contact Details page when contact item is called', async () => {


        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: nonEmergencyList,
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
        renderNavigationComponent(contactListScreen, store)

        const contactItem = screen.getByTestId('contact-item-1');
        expect(contactItem).toBeTruthy();

        fireEvent.press(contactItem);
        expect(mockNavigate).toHaveBeenCalled();
    }) 

})