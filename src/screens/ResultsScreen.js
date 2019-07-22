import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import styles from '../styles';

export default class ResultsScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Results</Text>
        <Text style={styles.results}>Words count: {this.props.navigation.getParam('totalWords', 0)}</Text>
        <Button 
          onPress={() => this.props.navigation.navigate('Practice')}
          title="Practice Again" />
      </View>
    );
  }
}