import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { 
  createSwitchNavigator, 
  createBottomTabNavigator, 
  createAppContainer } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

import i18n from './src/i18n';

import WelcomeScreen from './src/screens/WelcomeScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen';

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
        tabBarLabel: ({tintColor}) =>
        <Text style={ { fontSize: 10, color: tintColor, textAlign: 'center' } }>
          {i18n.t('navigation.home')}
        </Text>,
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="home" size={25} color={tintColor} />
      },
    },
    HighScores: {
      screen: HighScoresScreen,    
      navigationOptions: {
        tabBarLabel: ({tintColor}) =>
          <Text style={ { fontSize: 10, color: tintColor, textAlign: 'center' } }>
            {i18n.t('navigation.highScores')}
          </Text>,
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="chart-bar" size={25} color={tintColor} />
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: ({tintColor}) =>
        <Text style={ { fontSize: 10, color: tintColor, textAlign: 'center' } }>
          {i18n.t('navigation.settings')}
        </Text>,
        tabBarIcon: ({tintColor}) =>
          <FontAwesome5 name="cogs" size={25} color={tintColor} />
      },
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      showLabel: true
    }
  }
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

const AppContainer =  createAppContainer(InitialNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;

AppRegistry.registerComponent('SightWords', () => App);