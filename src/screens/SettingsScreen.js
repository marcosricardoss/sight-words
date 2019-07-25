import React, { Component } from 'react';
import { 
  Keyboard, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation';  

import {
  loadSettings,
  saveSettings
} from '../storage/settingsStorage';
import SettingsList from '../components/SettingsList'
import LanguageSelectorScreen from './LanguageSelectorScreen';
import AboutScreen from './AboutScreen';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  constructor(props) {
    super(props);

    this.state = { name: '', locale: 'en' }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const initialState = await loadSettings();
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    const locale = this.props.navigation.getParam('locale', null);
    if (locale && prevState.locale !== locale) {
      this.setState({ locale });
    }
  }

  handleNameChange(name){
    this.setState({ name });
  }

  handleSubmit() {
    saveSettings(this.state);
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Your name"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.name}
                onChangeText={this.handleNameChange}
              />
              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <SettingsList 
                onPressItem={(screen) => this.props.navigation.navigate(
                    screen,
                    { currentLocale: this.state.locale }
                  )
                }/>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen,
  LanguageSelector: LanguageSelectorScreen,
  About: AboutScreen
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SettingsNavigator;