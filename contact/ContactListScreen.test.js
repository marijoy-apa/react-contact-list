/**
 * @jest-environment node
 */


import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { cleanup, render } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import ContactListScreen from './src/screens/ContactListScreen';


import ContactFormReducer from './src/reducers/ContactFormReducer';
import ContactListReducer from './src/reducers/ContactListReducer';
import SearchItemReducer from './src/reducers/SearchItemReducer';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
  }));

describe('<Contact List App/>', () => {

    test('Contact List App should display', () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
            preloadedState: {
                searchKeyword: '', 
                contactForm: {error: ''}
            }
        })

        const component = (
                <Provider store={store}>
                    <ContactListScreen />
                </Provider>
        )
        const { getByPlaceholderText } = render(component);

        const searchBar = getByPlaceholderText('Search');
        expect(searchBar).toBeTruthy();
    })

})