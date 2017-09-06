import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class MainPage extends React.Component {
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
