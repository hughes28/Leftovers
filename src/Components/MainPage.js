import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';
import CompartmentButton from './CompartmentButton';

export default class MainPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <CompartmentButton navigation={this.props.navigation} compartmentName="Freezer"/>
        <CompartmentButton navigation={this.props.navigation} compartmentName="Refrigerator"/>
        <CompartmentButton navigation={this.props.navigation} compartmentName="Counter Top"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272822',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
});
