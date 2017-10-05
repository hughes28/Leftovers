import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class AppNavigator extends React.Component {
  render() {
    const AppNavigator = StackNavigator(AppRoutes, {
      initialRouteName: AppRoutes.mainPage.key,
      navigationOptions: {
        title: 'Leftovers',
        headerTitleStyle: {
          color: '#FFF',
        },
        headerTintColor: '#FFF',
        headerStyle: {
          justifyContent: 'center',
        },
      },
    });
    return (
      <AppNavigator style={styles.titleBar} />
    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
      backgroundColor: '#161714',
      marginTop: Platform.OS === 'ios' ? 0 : 11,
      height: 60,
  },
});
