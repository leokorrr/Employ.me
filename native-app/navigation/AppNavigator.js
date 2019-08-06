import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import ResultsScreen from '../screens/ResultsScreen';
import WelcomeScreen from '../screens/WelcomeScreen'


const AppNavigator = createStackNavigator(
  {
    Home: WelcomeScreen,
    SearchResult: ResultsScreen,
  },
  {
    initialRouteName: "Home"
  }
)

export default createAppContainer(AppNavigator)