import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/Home';
import Toy from './src/Toy';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Home} name="Home"/>
        <Stack.Screen component={Toy} name="Toy"/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;