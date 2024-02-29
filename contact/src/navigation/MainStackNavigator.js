
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from './navigationOptions';
import TabNavigator from './TabNavigator';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import EditContactScreen from '../screens/EditContactScreen';
import CreateContactScreen from '../screens/CreateContactScreen';

const Stack = createStackNavigator();

const MainStackNavigator = ({theme}) => {
    return (
        <Stack.Navigator initialRouteName='ContactList' screenOptions={stackNavigationOptions(theme)}>
            <Stack.Screen name="Contacts" component={TabNavigator} options={{ headerShown: false, }} />
            <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
            <Stack.Screen name="Edit Contact Screen" component={EditContactScreen} />
            <Stack.Screen name="Create Contact Screen" component={CreateContactScreen} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator;