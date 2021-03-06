import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';
import CompartmentButton from './CompartmentButton';
import ActionButton from 'react-native-action-button';

export default class MainPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
        />
        <CompartmentButton style={styles.mainButton} navigation={this.props.navigation} compartmentName="Freezer"/>
        <CompartmentButton style={styles.mainButton} navigation={this.props.navigation} compartmentName="Refrigerator"/>
        <CompartmentButton style={styles.mainButton} navigation={this.props.navigation} compartmentName="Counter Top"/>
        <ActionButton 
          fixNativeFeedbackRadius buttonColor="rgba(102,217,239,1)"
          onPressIn={() => {
            this.props.navigation.navigate(AppRoutes.quickAddPage.key)
          }}>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272822',
    display: 'flex'
  },
  mainButton: {
    flex: 1
  }
});

