import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import ResultsScreen from '../screens/ResultsScreen';
import WelcomeScreen from '../screens/WelcomeScreen'
import Job from '../screens/Job';


const AppNavigator = createStackNavigator(
  {
    Home: WelcomeScreen,
    SearchResult: ResultsScreen,
    Job: Job
  },
  {
    initialRouteName: "Home"
  }
)

export default createAppContainer(AppNavigator)