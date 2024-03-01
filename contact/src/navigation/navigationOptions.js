import { Platform } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const isIOS = Platform.OS === 'ios';

export const tabNavigatorOptions = (colors) => ({
    headerShadowVisible: false,
    headerTintColor: colors.onPrimary,
    headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 0,
    },
    cardStyle: {
        backgroundColor: colors.surface,
    },
    headerTitleAlign: 'center',
    tabBarLabelStyle: {
        fontSize: 13,
        paddingBottom: isIOS ? 0 : 15,
    },
    tabBarStyle: {
        paddingTop: 10,
        height: isIOS ? 85 : 65,
        backgroundColor: colors.background,
        borderTopWidth: 0,
    },
    tabBarActiveTintColor: '#007AFF', 
    tabBarInactiveTintColor: 'grey'
});

export const tabContactListOptions = (
    {
        tabBarIcon: ({ color }) => (<FontAwesome
            name='phone'
            size={25}
            color={color} />)
    }
)

export const tabEmergencyListOptions = (
    {
        tabBarIcon: ({ color }) => (<MaterialIcons
            name='contact-emergency'
            size={25}
            color={color} />)
    }
)

export const stackNavigationOptions = (theme) => (
    {
        headerTintColor: '#007AFF',
        headerShadowVisible: false,
        // headerStyle:
        //     { backgroundColor: theme.colors.background },
        cardStyle:
            { backgroundColor: theme.colors.surface }
    }
)