

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from '../../src/navigation/navigationOptions';
import { darkTheme } from '../../src/theme/theme';
import ContactListScreen from '../../src/screens/ContactListScreen';
import reduxStore from '../store/reduxStore';
import mockReduxStore from '../store/reduxStore';
const Stack = createStackNavigator();


const renderNavigationComponent = (children, store = mockReduxStore()) => {
    const component = (

        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={stackNavigationOptions(darkTheme)}>
                    {children}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )


    return render(component);
}

export { renderNavigationComponent };