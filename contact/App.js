// import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react';
import { Text } from 'react-native'
import { Provider } from 'react-redux';
import { configureStore, Tuple, logger } from '@reduxjs/toolkit'
import { initializeApp } from 'firebase/app'
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'

import ContactListScreen from './src/screens/ContactListScreen'
import EmergencyListScreen from './src/screens/EmergencyListScreen'
import CreateContactScreen from './src/screens/CreateContactScreen'
import EditContactScreen from './src/screens/EditContactScreen'
import ContactDetailsScreen from './src/screens/ContactDetailsScreen'
import reducers from './src/reducers'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initializeApp({
      apiKey: "AIzaSyBhdCJ2U0u9ZBWmCqPX1nuENNdiMaBbwbg",
      authDomain: "react-native-contact-c572e.firebaseapp.com",
      databaseURL: "https://react-native-contact-c572e-default-rtdb.firebaseio.com",
      projectId: "react-native-contact-c572e",
      storageBucket: "react-native-contact-c572e.appspot.com",
      messagingSenderId: "402627763000",
      appId: "1:402627763000:web:39ae9796a6e7ae519bbfcd"
    })
  }, [])

  return <Provider store={configureStore({ reducer: reducers, middleware: () => new Tuple(thunk) })}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ContactList'>
        <Stack.Screen name="Contacts" component={ContactScreen} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="Contact Details" component={ContactDetailsScreen} options={{ headerTitle: '', headerRight: () => (<Text>Edit</Text>) }} />
        <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
        <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>

}

const ContactScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => (<FontAwesome name='phone' size={20} color={color} />) }} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={20} color={color} />) }} />
  </Tab.Navigator >
)

export default App;