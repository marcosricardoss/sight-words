import React  from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import HighScores from '../components/HighScores';

class HighScoresScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HighScores data={this.props.highScores} totalNumber={25}/>
      </View>
    );
  }
}

const mapStateToProps = ({ highScores }) => ({
  highScores
});

export default connect(mapStateToProps, {})(HighScoresScreen);