import Cards from '../screens/Cards';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const CardsStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Cards" component={Cards} />
    </Stack.Navigator>
  );
};

export const createRootNavigator = () => {
  return <CardsStack />;
};
