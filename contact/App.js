import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';

import ContactListScreen from './src/components/ContactListScreen'
import EmergencyListScreen from './src/components/EmergencyListScreen'


const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Contact List" component={ContactListScreen} />
        <Tab.Screen name="Emergency List" component={EmergencyListScreen} />

      </Tab.Navigator >
    </NavigationContainer >
  )
}

export default App;