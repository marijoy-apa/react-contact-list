import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';


export const lightTheme = {
    ...DefaultTheme,
    mode: 'exact',
    colors: {
        ...DefaultTheme.colors,
        primaryContainer: 'lightgrey',
        secondaryContainer: '#e3e2e1',
        tertiaryContainer: '#303033',
        primary: 'grey',
        secondary: '#403f3f',
        background: '#fffafa', //white
        surface: '#f2f2f2', //greyish white
        onPrimary: 'black',
        onSecondary: 'grey',
        onTertiary: '#ebebeb'
    }
};

export const darkTheme = {
    ...MD3DarkTheme,
    mode: 'exact',
    colors: {
        ...MD3DarkTheme.colors,
        primaryContainer: '#424242',
        secondaryContainer: '#171716',
        tertiaryContainer: '#c9c9c9',
        primary: 'grey',
        secondary: '#e3e2e1',
        background: '#14130e', //black
        surface: '#1f1e1e',
        onPrimary: '#f0f0f0',
        onSecondary: '#d1d0cd',
        onTertiary: '#1b1c1f'
    }
};

