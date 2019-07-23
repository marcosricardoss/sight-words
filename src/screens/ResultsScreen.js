import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import styles from '../styles';
import {fetchHighScores, mergeHighScores, saveHighScores } from '../storage/highScoreStorage';

export default class ResultsScreen extends Component {
  constructor(props){
    super(props)
    this.state = { totalWords: 0, highScores: []}
  }

  componentDidMount() {
    const totalWords = this.props.navigation.getParam('totalWords', 0);
    this.setState({ totalWords });
    this.updateHighScores(totalWords);
  }

  async updateHighScores(totalWords) {
    try {
      let highScores = await fetchHighScores();
      highScores = mergeHighScores(highScores, totalWords);
      saveHighScores(highScores);

      this.setState({ highScores });

      console.log('High Scores', this.state.highScores);
    } catch (error) {
      console.log('Error fetching High Scores', error);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Results</Text>
        <Text style={styles.results}>Words count: {this.state.totalWords}</Text>
        <Button 
          onPress={() => this.props.navigation.navigate('Practice')}
          title="Practice Again" />
      </View>
    );
  }
}