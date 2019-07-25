import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import styles from '../styles';
import shuffle from '../shuffle';

import i18n from '../i18n';

import enWords from '../locales/words.en.json';
import deWords from '../locales/words.de.json';

const PRACTICE_TIME = 10 * 1000;

export default class PracticeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { totalWords: 0 };
    this.onPressNextWord = this.onPressNextWord.bind(this);
  }

  componentDidMount() {
    setTimeout(() => (
      this.props.navigation.navigate('Results', {
        totalWords: this.state.totalWords
      })
    ), PRACTICE_TIME);

    const allwords = i18n.locale == 'de' ? deWords : enWords;

    const words = shuffle(allwords);
    const currentWord = words.shift();

    this.setState({ 
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.word}>{this.state.currentWord}</Text>
        <Button 
          onPress={this.onPressNextWord}
          title={i18n.t('practice.next_word_button')} />
      </View>
    );
  }
}