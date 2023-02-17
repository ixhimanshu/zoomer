/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens();

// TODO: Remove when fixed
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from './app/navigation/MainNavigator';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store/reduxStore';



// APP
function App() {


  async function onAppBootstrap() {
    // Register the device with FCM
    // Save the token    


  }

  useEffect(() => {
    onAppBootstrap();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>

  );
}

export default App;
