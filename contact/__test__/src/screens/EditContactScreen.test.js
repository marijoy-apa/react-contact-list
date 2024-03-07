/**
 * @jest-environment node
 */


import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { cleanup, fireEvent, render, act, screen, waitFor } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import CreateContactScreen from '../../../src/screens/CreateContactScreen';
import { NavigationContainer } from '@react-navigation/native';

import { requestCameraPermissionsAsync, CameraType, launchCameraAsync } from 'expo-image-picker';

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import { updateContact } from '../../../src/actions';
import mockReducer from '../../__utils__/mockReducer';
import { renderProviderComponent } from '../../__utils__/renderProviderComponent';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';
import { stackNavigationOptions } from '../../../src/navigation/navigationOptions';
import { createStackNavigator } from '@react-navigation/stack';
import { darkTheme } from '../../../src/theme/theme';
import EditContactScreen from '../../../src/screens/EditContactScreen';
import { renderNavigationComponent } from '../../__utils__/renderNavigationComponent';
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
        // setOptions: mockedSetOptions 

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

describe('<Create Contact Screen/>', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()

    })

    test('Edit contact screen should render properly', async () => {
        const mockReducerContactList = mockReducer({
            isFetching: false,
            list: [{
                firstName: 'test',
                lastName: 'last',
                id: '1',
                phone: [{ type: 'Phone', digit: '324342' }],
                notes: '',
                emergencyContact: false,
                image: null
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



        renderNavigationComponent(editContactScreen, store)
        const doneText = screen.getByText('Save');
        const addPhoneText = screen.getByText('Add phone');
        const notesText = screen.getByText('Notes');
        const addToEmergency = screen.getByText('Add to emergency contacts');
        const addPhoto = screen.getByText('Add Photo');

        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const phoneInput = screen.getByPlaceholderText('Phone');

        expect(doneText).toBeTruthy();
        expect(addPhoneText).toBeTruthy();
        expect(notesText).toBeTruthy();
        expect(addToEmergency).toBeTruthy();
        expect(addPhoto).toBeTruthy();
        expect(firstNameInput).toBeTruthy();
        expect(lastNameInput).toBeTruthy();
        expect(phoneInput).toBeTruthy();
    });

    // test('Clicking cancel form should clear form', async () => {

    //     const mockReducerContactList = mockReducer({
    //         isFetching: false,
    //         list: [{ firstName: 'test', lastName: 'last', id: 1, emergencyContact: false }],
    //         error: ''
    //     })

    //     const mockReducerSearchKeyword = mockReducer('')

    //     const store = configureStore({
    //         reducer: combineReducers({
    //             contactForm: ContactFormReducer,
    //             contactList: mockReducerContactList,
    //             searchKeyword: mockReducerSearchKeyword,
    //         }),

    //     })

    //     const component = (
    //         <Provider store={store}>
    //             <NavigationContainer>
    //                 <Stack.Navigator screenOptions={stackNavigationOptions(darkTheme)}>
    //                     <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
    //                 </Stack.Navigator>
    //             </NavigationContainer>
    //         </Provider>
    //     )

    //     render(component);
    //     const cancelText = screen.getByText('Cancel');

    //     fireEvent.press(cancelText);
    //     expect(clearContactForm).toHaveBeenCalled();

    // }),

    test('Clicking Save button should create new contact', async () => {
        // const mockLinkingOpenURL = jest.spyOn(Linking, 'openURL').mockResolvedValue();
        updateContact.mockReturnValue({ type: 'success', success: true });
        // const mockDatabase = require('firebase/database');
        // mockDatabase.update.mockImplementation(() => Promise.resolve());

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
        renderNavigationComponent(editContactScreen, store)
        const saveForm = screen.getByTestId('on-save-button');

        fireEvent.press(saveForm);

        await waitFor(() => {
            expect(mockPop).not.toHaveBeenCalled();

        })
    })


    test('should be able to update phone type', async () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),

        })

        renderNavigationComponent(editContactScreen, store)
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

