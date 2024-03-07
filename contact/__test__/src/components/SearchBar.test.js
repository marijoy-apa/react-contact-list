import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit'
import ContactListScreen from '../../../src/screens/ContactListScreen';
import SearchBar from '../../../src/components/contactListPage/SearchBar';
import Spacer from '../../../src/components/common/Spacer';
import { FlatList } from 'react-native'
import App from '../../../App';
import { act } from 'react-test-renderer'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'

import ContactFormReducer from '../../../src/reducers/ContactFormReducer';
import ContactListReducer from '../../../src/reducers/ContactListReducer';
import SearchItemReducer from '../../../src/reducers/SearchItemReducer';
describe('<SearchBar/>', () => {
    // test('test ', () => {
    //     const { getByText } = render(<Spacer />);

    //     const helloWorldText = getByText('HELLO WORLD');
    //     expect(helloWorldText).toBeTruthy();

    // })
    test('Search bar should have placeholder text Search', () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
            preloadedState: {
                searchKeyword: ''
            }
        })

        const component = (
            <Provider store={store}>
                <SearchBar />
            </Provider>

        )

        // const { getByTestId } = render(component)
        // const searchBar = getByTestId('search-bar');
        // expect(searchBar).toBeDefined();
        // render(component);
        // const search = screen.getByPlaceholderText('Search')
        //     expect(search).toBeOnTheScreen();

        const { getByPlaceholderText } = render(component);

        const searchBar = getByPlaceholderText('Search');
        expect(searchBar).toBeTruthy();
    })

    test('Search bar should display the correct search value ', () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
            preloadedState: {
                searchKeyword: 'search item'
            }
        })

        const component = (
            <Provider store={store}>
                <SearchBar />
            </Provider>

        )

        const { getByPlaceholderText } = render(component);
        const searchBar = getByPlaceholderText('Search');
        expect(searchBar.props.value).toBe('search item');
    })

    test('Search bar should update value based on user input', () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
            preloadedState: {
                searchKeyword: 'search item'
            }
        })

        const component = (
            <Provider store={store}>
                <SearchBar />
            </Provider>

        )

        const { getByPlaceholderText } = render(component);
        const searchBar = getByPlaceholderText('Search');
        fireEvent.changeText(searchBar, 'hello world')
        expect(searchBar.props.value).toBe('hello world');
    })


    test('Search should be cleared when clear icon is pressed', () => {
        const store = configureStore({
            reducer: combineReducers({
                contactForm: ContactFormReducer,
                contactList: ContactListReducer,
                searchKeyword: SearchItemReducer,
            }),
            preloadedState: {
                searchKeyword: 'search item'
            }
        })

        const component = (
            <Provider store={store}>
                <SearchBar />
            </Provider>

        )

        const { getByTestId, getByPlaceholderText, queryByTestId } = render(component);
        const clearIcon = getByTestId('clear-search-item');
        const searchBar = getByPlaceholderText('Search');

        fireEvent.press(clearIcon)
        const newSearchBar = queryByTestId('clear-search-item');

        expect(searchBar.props.value).toBe('');
        expect(newSearchBar).toBeNull();
    })

})