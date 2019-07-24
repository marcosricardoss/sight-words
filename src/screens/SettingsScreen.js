import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import styles from '../styles';

export default class SettingsScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Settings</Text>
        </View>
      </View>
    );
  }
}