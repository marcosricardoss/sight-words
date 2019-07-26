import React, { Component } from 'react';
import { 
  Alert,  
  View, 
  ScrollView, 
  StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';  
import i18n from '../i18n';

import {
  loadSettings,
  saveSettings
} from '../storage/settingsStorage';
import SettingsList from '../components/SettingsList'
import LanguageSelectorScreen from './LanguageSelectorScreen';
import AboutScreen from './AboutScreen';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: i18n.t('navigation.settings')
  };

  constructor(props) {
    super(props);

    this.state = { name: '', locale: 'en' }
  }

  async componentDidMount() {
    const initialState = await loadSettings();
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    const locale = this.props.navigation.getParam('locale', null);
    if (locale && prevState.locale !== locale) {
      this.setState({ locale });
      saveSettings(this.state);
      Alert.alert(
        "Saved",
        "Restart the app to activate the modifications.",
        [
          {
            text: "Ok",
            style: 'destructive'
          }
        ]
      )
    }
  }  

  render() {
    return(
      <View style={styles.container}>
        <View>
          <ScrollView>            
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
  }
});

export default SettingsNavigator;