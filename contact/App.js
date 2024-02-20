// import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import {Text} from 'react-native'

import ContactListScreen from './src/screens/ContactListScreen'
import EmergencyListScreen from './src/screens/EmergencyListScreen'
import CreateContactScreen from './src/screens/CreactContactScreen'
import EditContactScreen from './src/screens/EditContactScreen'
import ContactDetailsScreen from './src/screens/ContactDetailsScreen'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='ContactList'>
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="Contact Details" component={ContactDetailsScreen} options={{ headerTitle: '', headerRight: ()=>(<Text>Edit</Text>)}} />
      <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
      <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

const ContactScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => (<FontAwesome name='phone' size={20} color={color} />) }} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={20} color={color} />) }} />
  </Tab.Navigator >
)

export default App;