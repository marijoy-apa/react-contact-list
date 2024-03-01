import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Appearance } from 'react-native'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { Provider as PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme/theme';

import reducers from './src/reducers'
import initializeFirebaseApp from './src/initializeFirebaseApp';
import MainStackNavigator from './src/navigation/MainStackNavigator';

const App = () => {
  const [scheme, setScheme] = useState(Appearance.getColorScheme())
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener((theme) => {
      setScheme(theme.colorScheme);
    });
    initializeFirebaseApp
    return () => {
      appearanceListener.remove();
    }
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Provider store={configureStore({ reducer: reducers, })}>
        <NavigationContainer theme={theme}>
          <MainStackNavigator theme={theme} />
        </NavigationContainer>
      </Provider>
    </PaperProvider>)
}


export default App;