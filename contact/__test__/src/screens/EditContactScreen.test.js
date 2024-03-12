/**
 * @jest-environment node
 */

import { combineReducers } from 'redux';
import { cleanup, fireEvent, act, screen, waitFor } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'

import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker';

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import { updateContact } from '../../../src/actions';
import mockReducer from '../../__utils__/mockReducer';
import { createStackNavigator } from '@react-navigation/stack';
import EditContactScreen from '../../../src/screens/EditContactScreen';
import { renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
import { editContactItem } from '../../data/editContact';
import { emergencyList } from '../../data/emergencyList';
jest.useFakeTimers();
const Stack = createStackNavigator();
const mockNavigate = jest.fn();
const mockPop = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => ({ params: { id: '1' } }),
    useNavigation: () => ({
        ...jest.requireActual('@react-navigation/native').useNavigation(),
        navigate: mockNavigate,
        pop: mockPop
    }),
}))

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../../src/actions', () => ({
    ...jest.requireActual('../../../src/actions'),
    clearContactForm: jest.fn().mockReturnValue({ type: 'CLEAR_CONTACT_FORM' }),
    createContact: jest.fn().mockReturnValue({ type: 'nothing' }),
    updateContact: jest.fn()
}))

jest.mock('expo-image-picker', () => ({
    ...jest.requireActual('expo-image-picker'),
    requestCameraPermissionsAsync: jest.fn(),
    launchCameraAsync: jest.fn(),
}));

const editContactScreen = <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />


describe('Edit Contact Screen', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()

    })

    test('Edit contact screen should render properly', async () => {
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

        renderNavigationComponent(editContactScreen, store)
        const doneText = screen.getByText('Save');
        const addPhoneText = screen.getByText('Add phone');
        const notesText = screen.getByText('Notes'); 
        const addToEmergency = screen.getByText('Remove from emergency contacts');
        const addPhoto = screen.getByText('Change Photo');

        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');

        expect(doneText).toBeTruthy();
        expect(addPhoneText).toBeTruthy();
        expect(notesText).toBeTruthy();
        expect(addToEmergency).toBeTruthy();
        expect(addPhoto).toBeTruthy();
        expect(firstNameInput).toBeTruthy();
        expect(lastNameInput).toBeTruthy();
    });


    test('Clicking Save button should update contact', async () => {
        updateContact.mockReturnValue({ type: 'success', success: true });

        const mockReducerSearchKeyword = mockReducer('')
        const mockReducerContactForm = mockReducer(editContactItem)
        const store = configureStore({
            reducer: combineReducers({
                contactForm: mockReducerContactForm,
                contactList: ContactListReducer,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })

        renderNavigationComponent(editContactScreen, store)
        const saveForm = screen.getByTestId('on-save-button');

        fireEvent.press(saveForm);

        await waitFor(() => {
            expect(updateContact).toHaveBeenCalled();
            expect(mockPop).toHaveBeenCalled();
        })
    })
 
    test('navigation pop should not be executed when update contact is unsuccessful', async () => {
        updateContact.mockReturnValue({ success: false, type: 'test' });

        const mockReducerSearchKeyword = mockReducer('')
        const mockReducerContactForm = mockReducer(editContactItem)
        const store = configureStore({
            reducer: combineReducers({
                contactForm: mockReducerContactForm,
                contactList: ContactListReducer,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(editContactScreen, store)
        const saveForm = screen.getByTestId('on-save-button');

        fireEvent.press(saveForm);

        await waitFor(() => {
            expect(mockPop).not.toHaveBeenCalled();

        })
    })


    test('should be able to update phone type', async () => {

        renderNavigationComponent(editContactScreen)
        const phoneTypeButton = screen.getByTestId('select-phone-type-button');

        fireEvent.press(phoneTypeButton)
        const phoneTypesModal = screen.getByTestId('radio-types-modal');
        expect(phoneTypesModal).toBeTruthy();

        const mobileRadioButton = screen.getByTestId('radio-element-Mobile')
        fireEvent.press(mobileRadioButton)

        const phoneTypeLabel = screen.getByTestId('phone-type-label')
        expect(phoneTypeLabel).toBeTruthy();
    })

    test('should be able to update image', async () => {
        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })
        const launchCameraAsyncResult = {
            cancelled: false,
            assets: [{ uri: 'mocked_image_uri' }],
        };
        launchCameraAsync.mockResolvedValueOnce(launchCameraAsyncResult);

        renderNavigationComponent(editContactScreen)

        const addPhotoButton = screen.getByText('Add Photo'); 
        await act(() => {
            fireEvent.press(addPhotoButton)
        });
        const changePhoto = screen.getByText('Change Photo');
        expect(changePhoto).toBeTruthy();


    })

    test('should be able to open camera and not capture image', async () => {

        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })
        const launchCameraAsyncResult = {
            canceled: true,
        };
        launchCameraAsync.mockResolvedValueOnce(launchCameraAsyncResult);
    
        renderNavigationComponent(editContactScreen)
        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });
        expect(addPhotoButton).toBeTruthy();
    })

    test('should be able to update error when error occurs', async () => {

        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })
        
        launchCameraAsync.mockRejectedValue(() => Promise.reject('Failed'));

        renderNavigationComponent(editContactScreen)

        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });

        expect(addPhotoButton).toBeTruthy();


    })
})

