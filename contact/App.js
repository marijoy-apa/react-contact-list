import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, View } from 'react-native'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import ContactListScreen from './src/screens/ContactListScreen'
import EmergencyListScreen from './src/screens/EmergencyListScreen'
import CreateContactScreen from './src/screens/CreateContactScreen'
import EditContactScreen from './src/screens/EditContactScreen'
import ContactDetailsScreen from './src/screens/ContactDetailsScreen'
import reducers from './src/reducers'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import initializeFirebaseApp from './src/initializeFirebaseApp';
import { darkTheme, lightTheme } from './src/theme';
import { useColorScheme, Appearance } from 'react-native';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isIOS = Platform.OS === 'ios'
const App = () => {
  const [scheme, setScheme] = useState(Appearance.getColorScheme())
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  // const { colors } = useTheme();
  useEffect(() => {
    Appearance.addChangeListener((theme) => {
      console.log('theme hehe', theme)
      setScheme(theme.colorScheme);
    });
    initializeFirebaseApp
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Provider store={configureStore({ reducer: reducers, })}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='ContactList' screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background }, cardStyle: { backgroundColor: theme.colors.surface } }}>
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


  return <Tab.Navigator screenOptions={{ headerShadowVisible: false, headerTintColor: colors.onPrimary, headerStyle: { backgroundColor: colors.background, borderBottomWidth: 0 }, cardStyle: { backgroundColor: colors.surface }, headerTitleAlign: 'center', tabBarLabelStyle: { fontSize: 13, paddingBottom: isIOS ? 0 : 15 }, tabBarStyle: { paddingTop: 10, height: isIOS ? 85 : 65, backgroundColor: colors.background, borderTopWidth: 0 } }}>
    <Tab.Screen name="Contact List" component={ContactListScreen} options={{ tabBarIcon: ({ color }) => (<FontAwesome name='phone' size={25} color={color} />) }} />
    <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={{ tabBarIcon: ({ color }) => (<MaterialIcons name='contact-emergency' size={25} color={color} />), }} />
  </Tab.Navigator >
}

export default App;