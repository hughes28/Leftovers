import React from 'react';
import { StackNavigator } from 'react-navigation';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class AppNavigator extends React.Component {
  render() {
    const AppNavigator = StackNavigator(AppRoutes, {
      initialRouteName: AppRoutes.mainPage.key,
      navigationOptions: {title: 'LEFTOVERS'}
    });
    return (
      <AppNavigator style={styles.titleBar} />
    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
    paddingTop: 20
  },
});
