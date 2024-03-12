/**
 * @jest-environment node
 */

import '@react-navigation/native'
import { combineReducers } from 'redux';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';

import mockReducer from '../../__utils__/mockReducer';
import { createStackNavigator } from '@react-navigation/stack';
import ContactDetailsScreen from '../../../src/screens/ContactDetailsScreen';
import { updateEmergencyContact } from '../../../src/actions';
import { Linking } from 'react-native';
import ContactIcons from '../../../src/components/contactDetailsPage/ContactIcons';
import { renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
import { contactDetailMultipleNum, contactDetailsItem, contactDetailsWithImage } from '../../data/contactDetails';

jest.useFakeTimers();

const Stack = createStackNavigator();
const contactDetailsScreen = <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
const mockNavigate = jest.fn();

jest.mock('../../../src/actions', () => ({
    ...jest.requireActual('../../../src/actions'),

    updateEmergencyContact: jest.fn().mockReturnValue({ type: 'nothing' })
}))
jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
    update: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => ({ params: { id: '1' } }),
    useNavigation: () => ({
        ...jest.requireActual('@react-navigation/native').useNavigation(),
        navigate: mockNavigate

    }),
}))
describe('<Contact Details App/>', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('Contact Details App should be rendered', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailsItem,
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

        renderNavigationComponent(contactDetailsScreen, store)

        const emptyProfileImage = screen.getByTestId('empty-profile');
        const messageButton = screen.getByTestId('message-icon');
        const callButton = screen.getByTestId('call-icon');
        const videoCameraButton = screen.getByTestId('video-camera-icon');
        const emailButton = screen.getByTestId('email-icon');
        const fullNameLabel = screen.getByTestId('full-name');

        const phoneNumber = screen.getByTestId('phone-number-input');
        const notes = screen.getByTestId('notes');
        const addEmergencyBtn = screen.getByText('Remove from emergency contacts');

        expect(emptyProfileImage).toBeTruthy();
        expect(fullNameLabel).toBeTruthy();

        expect(messageButton).toBeTruthy();
        expect(callButton).toBeTruthy();
        expect(videoCameraButton).toBeTruthy();
        expect(emailButton).toBeTruthy();

        expect(phoneNumber).toBeTruthy();
        expect(notes).toBeTruthy();
        expect(addEmergencyBtn).toBeTruthy();

    })

    test('Header right should contain the edit button', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailsItem,
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

        renderNavigationComponent(contactDetailsScreen, store)
        const editButton = screen.getByTestId('edit-button');
        expect(editButton).toBeTruthy();

        fireEvent.press(editButton);
        expect(mockNavigate).toHaveBeenCalledWith('Edit Contact Screen', { id: '1' })
    })

    test('Contact item with image property should render image', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailsWithImage,
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

        renderNavigationComponent(contactDetailsScreen, store)

        const imageProfile = screen.getByTestId('image-profile');

        expect(imageProfile).toBeTruthy();

    })

    test('Clicking Emergency button should update isEmergencyContact property of the contact', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailsWithImage,
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

        renderNavigationComponent(contactDetailsScreen, store)
        const addToEmergency = screen.getByText('Add to emergency contacts');

        fireEvent.press(addToEmergency);
        expect(updateEmergencyContact).toHaveBeenCalled();
    })

    test('Phone selection modal will display when calling with multiple numbers', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailMultipleNum,
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

        renderNavigationComponent(contactDetailsScreen, store)
        const addToEmergency = screen.getByTestId('call-icon');

        fireEvent.press(addToEmergency);
        const callDialog = screen.getByTestId('call-dialog');

        expect(callDialog).toBeTruthy();

    })


    test('onCall Function should be call when selecting phone number for multiple phone numbers', async () => {
        const mockLinkingOpenURL = jest.spyOn(Linking, 'openURL').mockResolvedValue();

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailMultipleNum,
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

        renderNavigationComponent(contactDetailsScreen, store)
        const addToEmergency = screen.getByTestId('call-icon');

        fireEvent.press(addToEmergency);
        const number = screen.getByTestId('radio-element-231312');
        fireEvent.press(number);
        const phoneUrl = 'tel:231312';

        expect(mockLinkingOpenURL).toHaveBeenCalledWith(phoneUrl);

        mockLinkingOpenURL.mockRestore();
    })


    test('onCall Function should be call when clicking phone icon for single phone numbers', async () => {
        const mockLinkingOpenURL = jest.spyOn(Linking, 'openURL').mockResolvedValue();

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: contactDetailsItem,
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

        renderNavigationComponent(contactDetailsScreen, store)
        const callIcon = screen.getByTestId('call-icon');

        fireEvent.press(callIcon);

        const phoneUrl = 'tel:324342';

        expect(mockLinkingOpenURL).toHaveBeenCalledWith(phoneUrl);

        mockLinkingOpenURL.mockRestore();
    })

    test('onCall Function should be call when clicking phone icon for single phone numbers', async () => {
        const mockLinkingOpenURL = jest.spyOn(Linking, 'openURL').mockRejectedValue(() => Promise.reject('Failed'));
        const mockOnError = jest.fn();


        const component = (
            <ContactIcons
                phone={[{ type: 'Phone', digit: '324342' }]}
                onError={mockOnError}
            />
        )
        render(component);
        const callIcon = screen.getByTestId('call-icon');

        fireEvent.press(callIcon);
        const phoneUrl = 'tel:324342';

        expect(mockLinkingOpenURL).toHaveBeenCalledWith(phoneUrl);
        await mockLinkingOpenURL
        expect(mockOnError).toHaveBeenCalled();


        mockLinkingOpenURL.mockRestore();

    })
})