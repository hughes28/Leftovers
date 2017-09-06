import React from 'react';
import AppNavigator from './src/Navigators/AppNavigator';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

