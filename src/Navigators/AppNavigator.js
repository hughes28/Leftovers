import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class AppNavigator extends React.Component {
  render() {
    const AppNavigator = StackNavigator(AppRoutes, {
      initialRouteName: AppRoutes.mainPage.key,
      navigationOptions: {title: 'Leftovers'}
    });
    return (
      <AppNavigator style={styles.titleBar} />
    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
      marginTop: Platform.OS === 'ios' ? 0 : 20,
      height: 60,
  },
});
