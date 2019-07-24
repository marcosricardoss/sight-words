import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { 
  createSwitchNavigator, 
  createBottomTabNavigator, 
  createAppContainer } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';

import WelcomeScreen from './src/screens/WelcomeScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';
import SettingsScreen from './src/screens/SettingsScreen';


class App extends Component {
  render() {
    return <HomeNavigator />
  }
}

const HomeNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Practice: PracticeScreen,
  Results: ResultsScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="home" size={25} color={tintColor} />
      },
    },
    HighScores: {
      screen: HighScoresScreen,    
      navigationOptions: {
        tabBarLabel: 'High Scores',
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="chart-bar" size={25} color={tintColor} />
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="cogs" size={25} color={tintColor} />
      },
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      showLabel: false
    }
  }
);

export default createAppContainer(AppNavigator);

AppRegistry.registerComponent('BlitzReading', () => App);