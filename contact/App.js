import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import ContactListScreen from './src/screens/ContactListScreen'
import EmergencyListScreen from './src/screens/EmergencyListScreen'
import CreateContactScreen from './src/screens/CreateContactScreen'
import EditContactScreen from './src/screens/EditContactScreen'
import ContactDetailsScreen from './src/screens/ContactDetailsScreen'
import reducers from './src/reducers'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import initializeFirebaseApp from './src/initializeFirebaseApp';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isIOS = Platform.OS === 'ios'
const App = () => {
  useEffect(() => {
    initializeFirebaseApp
  }, [])

  return <Provider store={configureStore({ reducer: reducers, })}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ContactList' screenOptions={{ headerTintColor: '#007AFF' }}>
        <Stack.Screen name="Contacts" component={ContactScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
        <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
        <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>

}

const ContactScreen = () => (
  <Tab.Navigator screenOptions={{ headerTitleAlign: 'center', tabBarLabelStyle: { fontSize: 13, paddingBottom: isIOS ? 0 : 15 }, tabBarStyle: { paddingTop: 10, height: isIOS ? 85 : 65 } }}>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={{ tabBarIcon: ({ color }) => (<FontAwesome name='phone' size={25} color={color} />) }} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={{ tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={25} color={color} />), }} />
  </Tab.Navigator >
)

export default App;