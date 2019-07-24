import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import WelcomeScreen from './src/screens/WelcomeScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ResultsScreen from './src/screens/ResultsScreen';

class App extends Component {
  render() {
    return <AppNavigator />
  }
}

const HomeNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Practice: PracticeScreen,
  Results: ResultsScreen
});
export default createAppContainer(HomeNavigator);

AppRegistry.registerComponent('BlitzReading', () => App);