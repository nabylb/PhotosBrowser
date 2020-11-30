import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createRootNavigator} from './navigation';

export default function App() {
  return <NavigationContainer>{createRootNavigator()}</NavigationContainer>;
}
