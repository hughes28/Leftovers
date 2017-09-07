import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class MainPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Freezer'})}}>
          <Text>Freezer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Refrigerator'})}}>
          <Text>Refrigerator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Counter Top'})}}>
          <Text>Counter Top</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
