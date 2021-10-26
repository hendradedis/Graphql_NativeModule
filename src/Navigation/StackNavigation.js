import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screen/Common/HomeScreen';
import DetailScreen from '../Screen/Common/DetailScreen';
import ListScreen from '../Screen/Common/ListScreen';

const StackNavigator = createStackNavigator()
function StackNavigation() {
  return(
    <StackNavigator.Navigator initialRouteName={"Home"}>
      <StackNavigator.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <StackNavigator.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}}/>
      <StackNavigator.Screen name="ListScreen" component={ListScreen} options={{headerShown: false}}/>
    </StackNavigator.Navigator>
  )
}

export default StackNavigation;