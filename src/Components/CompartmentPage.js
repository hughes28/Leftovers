import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class CompartmentPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.compartment}`,
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>Bonjour</Text>
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
