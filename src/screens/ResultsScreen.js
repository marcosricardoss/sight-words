import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../i18n';
import { updateHighScores } from '../actions'

import styles from '../styles';
import {
  fetchHighScores, 
  mergeHighScores, 
  saveHighScores } from '../storage/highScoreStorage';
import HighScores from '../components/HighScores';


class ResultsScreen extends Component {
  constructor(props){
    super(props)
    this.state = { totalWords: 0, highScores: []}
  }

  componentDidMount() {
    const totalWords = this.props.navigation.getParam('totalWords', 0);
    this.setState({ totalWords });
    this.updateHighScores(totalWords);
    this.props.updateHighScores([{ score: totalWords, createdAt: new Date() }]);
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
        <Text style={styles.welcome}>{i18n.t('results.title')}</Text>
        <Text style={styles.results}>
          {i18n.t('results.words_count')}: {this.state.totalWords}
        </Text>
        <HighScores data={this.props.highScores} />
        <Button 
          onPress={() => this.props.navigation.navigate('Practice')}
          title="Practice Again" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  highScores: state.highScores
});

const mapDispachToProps = ({ updateHighScores });

export default connect(mapStateToProps, mapDispachToProps)(ResultsScreen);