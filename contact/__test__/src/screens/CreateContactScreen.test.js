/**
 * @jest-environment node
 */
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { cleanup, fireEvent, render, act, screen } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import CreateContactScreen from '../../../src/screens/CreateContactScreen';

import { requestCameraPermissionsAsync, CameraType, launchCameraAsync } from 'expo-image-picker';

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import { clearContactForm, createContact } from '../../../src/actions';
import mockReducer from '../../__utils__/mockReducer';
import { renderProviderComponent } from '../../__utils__/renderProviderComponent';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';
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
    updateError: jest.fn().mockReturnValue({ type: 'nothing' }),
}))

jest.mock('expo-image-picker', () => ({
    ...jest.requireActual('expo-image-picker'),
    requestCameraPermissionsAsync: jest.fn(),
    launchCameraAsync: jest.fn(),
}));

describe('<Create Contact Screen/>', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()

    })

    test('Create contact screen should render properly', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [{ firstName: 'test', lastName: 'last', id: 1, emergencyContact: false }],
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

        renderProviderComponent(<CreateContactScreen />, store)

        const cancelText = screen.getByText('Cancel');
        const doneText = screen.getByText('Done');
        const addPhoneText = screen.getByText('Add phone');
        const notesText = screen.getByText('Notes');
        const addToEmergency = screen.getByText('Add to emergency contacts');
        const addPhoto = screen.getByText('Add Photo');

        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const phoneInput = screen.getByPlaceholderText('Phone');

        expect(cancelText).toBeTruthy();
        expect(doneText).toBeTruthy();
        expect(addPhoneText).toBeTruthy();
        expect(notesText).toBeTruthy();
        expect(addToEmergency).toBeTruthy();
        expect(addPhoto).toBeTruthy();
        expect(firstNameInput).toBeTruthy();
        expect(lastNameInput).toBeTruthy();
        expect(phoneInput).toBeTruthy();
    });

    test('Clicking cancel form should clear form', async () => {

        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [{ firstName: 'test', lastName: 'last', id: 1, emergencyContact: false }],
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

        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

        const cancelText = screen.getByText('Cancel');

        fireEvent.press(cancelText);
        expect(clearContactForm).toHaveBeenCalled();

    }),

        test('Clicking Save button should create new contact', async () => {
            const mockReducerSearchKeyword = mockReducer('')
            const mockReducerContactForm = mockReducer({
                firstName: 'John',
                lastName: 'Doe',
                phone: [{ type: 'Phone', digit: '23123' }],
                notes: 'Some notes',
                emergencyContact: false,
                image: null,
                isValid: true,
            })
            const store = configureStore({
                reducer: combineReducers({
                    contactForm: mockReducerContactForm,
                    contactList: ContactListReducer,
                    searchKeyword: mockReducerSearchKeyword,
                }),

            })

            renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

            const saveForm = screen.getByTestId('on-save-button');

            fireEvent.press(saveForm);
            expect(createContact).toHaveBeenCalled();
        })

    test('should be able to update state values of form', async () => {

        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
 
        })
        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

        const addPhoneText = screen.getByText('Add phone');
        const notesInput = screen.getByTestId('notes-input');

        const addToEmergency = screen.getByText('Add to emergency contacts');

        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        var phoneInput = screen.getByPlaceholderText('Phone');

        expect(firstNameInput.props.value).toBe('')

        fireEvent.changeText(firstNameInput, 'Updated first name');
        expect(firstNameInput.props.value).toBe('Updated first name')

        fireEvent.changeText(lastNameInput, 'Updated last name');
        expect(lastNameInput.props.value).toBe('Updated last name')

        fireEvent.changeText(phoneInput, '234324324');
        expect(phoneInput.props.value).toBe('234324324')

        fireEvent.changeText(notesInput, 'Test notes');
        expect(notesInput.props.value).toBe('Test notes')

        fireEvent.press(addPhoneText)
        phoneInput = screen.getAllByPlaceholderText('Phone');
        expect(phoneInput).toHaveLength(2)

        fireEvent.press(addToEmergency)
        const removeFromEmergency = screen.getByText('Remove from emergency contacts');
        expect(removeFromEmergency).toBeTruthy();
    })

    test('should be able to update phone type', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })

        const component = (
            <Provider store={store}>
                <CreateContactScreen onCancel={() => { }} />
            </Provider>
        )

        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

        const phoneTypeButton = screen.getByTestId('select-phone-type-button');

        fireEvent.press(phoneTypeButton)
        const phoneTypesModal = screen.getByTestId('radio-types-modal');
        expect(phoneTypesModal).toBeTruthy();

        const mobileRadioButton = screen.getByTestId('radio-element-Mobile')
        fireEvent.press(mobileRadioButton)

        const phoneTypeLabel = screen.getByTestId('phone-type-label')
        expect(phoneTypeLabel).toBeTruthy();
    })
    test('error message displayed when invalid phone number', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })

        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

        const phoneInput = screen.getByPlaceholderText('Phone');

        fireEvent.changeText(phoneInput, 'werwr3243');
        const errorMessage = screen.getByText('Phone Number should only contain number')
        expect(errorMessage).toBeTruthy();

        fireEvent.changeText(phoneInput, '   ');
        const errorLine = screen.queryByText('Phone Number should only contain number')
        expect(errorLine).toBeNull();

    })

    test('should be able to capture image', async () => {
        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })
        const launchCameraAsyncResult = {
            cancelled: false,
            assets: [{ uri: 'mocked_image_uri' }],
        };
        launchCameraAsync.mockResolvedValueOnce(launchCameraAsyncResult);
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })

        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)

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
            // assets: [{ uri: 'mocked_image_uri' }], 
        };
        launchCameraAsync.mockResolvedValueOnce(launchCameraAsyncResult);
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })
        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)
        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });
        expect(addPhotoButton).toBeTruthy();
    })

    test('should be able to update error when error occurs', async () => {

        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })
        const launchCameraAsyncResult = {
            cancelled: false,
            assets: [{ uri: 'mocked_image_uri' }],
        };
        launchCameraAsync.mockRejectedValue(() => Promise.reject('Failed'));

        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })

        renderProviderComponent(<CreateContactScreen onCancel={jest.fn()} />, store)


        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });

        expect(addPhotoButton).toBeTruthy();


    })
})

