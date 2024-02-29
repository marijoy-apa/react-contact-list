import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Appearance } from 'react-native'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import ContactListScreen from './src/screens/ContactListScreen'
import EmergencyListScreen from './src/screens/EmergencyListScreen'
import CreateContactScreen from './src/screens/CreateContactScreen'
import EditContactScreen from './src/screens/EditContactScreen'
import ContactDetailsScreen from './src/screens/ContactDetailsScreen'
import reducers from './src/reducers'
import initializeFirebaseApp from './src/initializeFirebaseApp';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme';
import { tabNavigatorOptions, tabContactListOptions, tabEmergencyListOptions, stackNavigationOptions } from './src/navigationOptions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [scheme, setScheme] = useState(Appearance.getColorScheme())
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    Appearance.addChangeListener((theme) => {
      setScheme(theme.colorScheme);
    });
    initializeFirebaseApp
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Provider store={configureStore({ reducer: reducers, })}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='ContactList' screenOptions={stackNavigationOptions(theme)}>
            <Stack.Screen name="Contacts" component={ContactScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
            <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
            <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>)

}

const ContactScreen = () => {

  const { colors } = useTheme();


  return <Tab.Navigator screenOptions={tabNavigatorOptions(colors)}>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={tabContactListOptions} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={tabEmergencyListOptions} />
  </Tab.Navigator >
}

export default App;