

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


const renderProviderComponent = (child, store) => {
    const component = (
        <Provider store={store}>
            {child}
        </Provider>

        // <Provider store={store}>
        //     <NavigationContainer>
        //         <Stack.Navigator screenOptions={stackNavigationOptions(darkTheme)}>
        //             <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
        //         </Stack.Navigator>
        //     </NavigationContainer>
        // </Provider>
    )

    return render(component);
}

export { renderProviderComponent };