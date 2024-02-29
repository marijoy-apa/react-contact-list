import { useTheme } from "react-native-paper";
import { tabContactListOptions, tabEmergencyListOptions, tabNavigatorOptions } from "./navigationOptions";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ContactListScreen from "../screens/ContactListScreen";
import EmergencyListScreen from "../screens/EmergencyListScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const { colors } = useTheme();
    return <Tab.Navigator screenOptions={tabNavigatorOptions(colors)}>
        <Tab.Screen name="Contact List" component={ContactListScreen} options={tabContactListOptions} />
        <Tab.Screen name="Emergency List" component={EmergencyListScreen} options={tabEmergencyListOptions} />
    </Tab.Navigator >
}

export default TabNavigator;