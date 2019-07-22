import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: 'welcome' };
    this.onPressPratice = this.onPressPratice.bind(this);
    this.onPressNextWord = this.onPressNextWord.bind(this);
  }

  onPressPratice() {
    this.setState({ currentScreen: 'practice' });
  }

  onPressNextWord() {
    this.setState({ currentScreen: 'results'})
  }

  renderWelcomeScreen() {
    return(
      <View>
        <Text style={styles.welcome}>Welcome to Blitz Reading!</Text>
        <Button 
          onPress={this.onPressPratice}
          title="Practice" />
      </View>
    );
  } 

  renderPraticeScreen() {
    return (
      <View>
        <Text style={styles.word}>word</Text>
        <Button 
          onPress={this.onPressNextWord}
          title="Next Word" />
      </View>
    );
  }

  renderResultsScreen() {
    return(
      <View>
        <Text style={styles.welcome}>Results</Text>
        <Text style={styles.results}>Words count: 0</Text>
        <Button 
          onPress={this.onPressPratice}
          title="Practice Again" />
      </View>
    );
  }

  render() {
    const { currentScreen } = this.state;
    return (
      <View style={styles.container}>
        { currentScreen === 'welcome' && this.renderWelcomeScreen() }
        { currentScreen === 'practice' && this.renderPraticeScreen() }
        { currentScreen === 'results' && this.renderResultsScreen() }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  },
  word: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  resulst: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  }
});

AppRegistry.registerComponent('BlitzReading', () => App);