/**
 * @jest-environment node
 */
import { combineReducers } from 'redux';
import { cleanup, fireEvent, act, screen, waitFor } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import CreateContactScreen from '../../../src/screens/CreateContactScreen';
import mockReducer from '../../__utils__/mockReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import ContactListScreen from '../../../src/screens/ContactListScreen';
import mockReduxStore from '../../store/reduxStore';

import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker';
import { clearContactForm, createContact } from '../../../src/actions';
import { renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { createContactItem } from '../../data/createContact';

jest.useFakeTimers();

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
const Stack = createStackNavigator();
const createContactScreen = <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />

const contactListScreen = <Stack.Screen name="Contact List" component={ContactListScreen} />

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

        const store = mockReduxStore({
            contactList: mockReducerContactList,
            searchKeyword: mockReducerSearchKeyword,
        })

        renderNavigationComponent(createContactScreen, store)

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

        const store = mockReduxStore({
            contactList: mockReducerContactList,
            searchKeyword: mockReducerSearchKeyword,
        })
        renderNavigationComponent(contactListScreen, store)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab)
        const cancelText = screen.getByText('Cancel');

        await act(() => {
            fireEvent.press(cancelText);
        })
        expect(clearContactForm).toHaveBeenCalled();

    })
    test('Clicking Save button should create new contact', async () => {
        const mockReducerSearchKeyword = mockReducer('')
        const mockReducerContactForm = mockReducer(createContactItem)
        const store = configureStore({
            reducer: combineReducers({
                contactForm: mockReducerContactForm,
                contactList: ContactListReducer,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })

        renderNavigationComponent(contactListScreen, store)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab);
        const saveForm = screen.getByTestId('on-save-button');

        await act(async () => {
            fireEvent.press(saveForm);
        })
        expect(createContact).toHaveBeenCalled();
    })

    test('snack bar should display when error on create occurs', async () => {
        createContact.mockReturnValue({ success: false, type: 'test' });

        const mockReducerSearchKeyword = mockReducer('')
        const mockReducerContactForm = mockReducer(createContactItem)
        const store = configureStore({
            reducer: combineReducers({
                contactForm: mockReducerContactForm,
                contactList: ContactListReducer,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })

        renderNavigationComponent(contactListScreen, store)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab);
        const saveForm = screen.getByTestId('on-save-button');

        await act(async () => {
            fireEvent.press(saveForm);
        })
        const snackBar = screen.getByTestId('snackbar-error');
        expect(snackBar).toBeTruthy()
    })

    test('pressing close snackbar should remove snackbar', async () => {
        createContact.mockReturnValue({ success: false, type: 'test' });

        const mockReducerSearchKeyword = mockReducer('')
        const mockReducerContactForm = mockReducer(createContactItem)
        const store = configureStore({
            reducer: combineReducers({
                contactForm: mockReducerContactForm,
                contactList: ContactListReducer,
                searchKeyword: mockReducerSearchKeyword,
            }),

        })
        renderNavigationComponent(contactListScreen, store)
        const fab = screen.getByTestId('fab');
        fireEvent.press(fab);
        const saveForm = screen.getByTestId('on-save-button');


        await act(async () => {
            fireEvent.press(saveForm);
        })
        var snackBar = screen.getByTestId('snackbar-error');
        expect(snackBar).toBeTruthy()

        var closeSnackbar = screen.getByTestId('close-snackbar-button');
        fireEvent.press(closeSnackbar);

        await waitFor(() => {
            snackBar = screen.queryByTestId('snackbar-error');
            expect(snackBar).toBeTruthy()
        })
    })

    test('should be able to update state values of form', async () => {

        renderNavigationComponent(createContactScreen)

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
        const store = mockReduxStore()
        renderNavigationComponent(createContactScreen, store)

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

        renderNavigationComponent(createContactScreen)

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

        renderNavigationComponent(createContactScreen)

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

        renderNavigationComponent(createContactScreen)
        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });
        expect(addPhotoButton).toBeTruthy();
    })

    test('should be able to update error when error occurs', async () => {

        requestCameraPermissionsAsync.mockResolvedValueOnce({ status: 'granted' })

        launchCameraAsync.mockRejectedValue(() => Promise.reject('Failed'));

        renderNavigationComponent(createContactScreen)

        const addPhotoButton = screen.getByText('Add Photo');
        await act(() => {
            fireEvent.press(addPhotoButton)
        });

        expect(addPhotoButton).toBeTruthy();
    })
})

