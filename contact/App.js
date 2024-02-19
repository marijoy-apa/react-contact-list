import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';

import ContactListScreen from './src/components/ContactListScreen'
import EmergencyListScreen from './src/components/EmergencyListScreen'
import CreateContactScreen from './src/components/CreactContactScreen'
import EditContactScreen from './src/components/EditContactScreen'
import ContactDetailsScreen from './src/components/ContactDetailsScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='ContactList'>
      <Stack.Screen name="ContactList" component={ContactScreen} />
      <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
      <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
      <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

// const EmergencyScreen = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Emergency" component={EmergencyListScreen} />
//     <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
//   </Stack.Navigator>
// )


const ContactScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={{ headerShown: false }} />
  </Tab.Navigator >
)

export default App;