/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';

import React from 'react';

import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';

// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';

import Alert from './src/components/Alert';
import CustomLoading from './src/components/Loading';
import Popup from './src/components/Popup';
import R from './src/components/R';
import ReactotronConfig from './src/config/ReactotronConfig';
import AppNavigator from './src/navigation/AppNavigator';
import {
  isMountedRef,
  navigationRef,
} from './src/navigation/NavigationService';
import { store } from './src/stores';

const reactotron = ReactotronConfig.configure();
reactotron.clear;

isMountedRef.current = true;
const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
      <FlashMessage position="top" />
      <CustomLoading ref={ref => (R.Loading = ref)} />
      <Popup ref={ref => (R.Popup = ref)} />
      <Alert ref={ref => (R.Alert = ref)} />
    </>
  );
}

export default App;