import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class LanguageListItem extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  handleLocaleChange() {
    Alert.alert(
      'Change language?',
      null,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change',
          onPress: () => this.props.onChangeLocale(this.props.locale),
          style: 'destructive'
        }
      ]
    )
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.listItem}
        onPress={this.handleLocaleChange}
      >
        <View style={styles.textWrapper}>
          <Text
            style={[styles.title, (this.props.isActive && styles.active)]}
          >
            {this.props.name}
          </Text>
          {
            this.props.englishName &&
              <Text style={styles.subtitle}>{this.props.englishName}</Text>
          }
        </View>
        {
          this.props.isActive &&
            <Ionicons 
              style={styles.active} 
              name="ios-checkmark-circle-outline" 
              size={30} />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 10
  },
  textWrapper: {
    width: '90%',
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    color: '#434343'
  },
  subtitle: {
    color: '#AAAAAA'
  },
  active: {
    color: '#03a87c'
  }
});

export default LanguageListItem;