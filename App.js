import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import shuffle from './src/shuffle'
import allwords from './src/words.en.json'

const PRACTICE_TIME = 10 * 1000;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: 'welcome',  totalWords: 0 };
    this.onPressPratice = this.onPressPratice.bind(this);
    this.onPressNextWord = this.onPressNextWord.bind(this);
  }

  onPressPratice() {
    setTimeout(() => (
      this.setState({ currentScreen: 'results'})
    ), PRACTICE_TIME);

    const words = shuffle(allwords);
    const currentWord = words.shift();

    this.setState({ 
      currentScreen: 'practice',
      currentWord,
      words,
      totalWords: 0
    });
  }

  onPressNextWord() {
    const { words, totalWords } = this.state;
    const nextWord = words.shift();
    this.setState({ 
      currentWord: nextWord,
      words,
      totalWords: totalWords + 1
    })
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
        <Text style={styles.word}>{this.state.currentWord}</Text>
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
        <Text style={styles.results}>Words count: {this.state.totalWords}</Text>
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
  results: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  }
});

AppRegistry.registerComponent('BlitzReading', () => App);