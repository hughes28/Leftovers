import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class MainPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.button, styles.counterTop]}
          onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Counter Top'})}}
        >
          <Text style={styles.buttonText}>Counter Top</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.freezer]}
          onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Freezer'})}}
        >
          <Text style={styles.buttonText}>Freezer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.refrigerator]}
          onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: 'Refrigerator'})}}
        >
          <Text style={styles.buttonText}>Refrigerator</Text>
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
    display: 'flex'
  },
  button: {
    justifyContent: 'center',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 26
  },
  counterTop: {
    flex: 1
  },
  freezer: {
    flex: 1
  },
  refrigerator: {
    flex: 2
  },
});
