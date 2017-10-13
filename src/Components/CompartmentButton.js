import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';

export default class CompartmentButton extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      itemsInCompartment: 0,
      expiredItems: 0,
      closeToExpirationItems: 0,
    }
  }

  componentWillMount() {
    this.getItem();
  }

  async getItem() {
    try {
      const title = this.props.compartmentName;
      const value = await AsyncStorage.getItem(title);
      if (value !== null) {
        // We have data!!
        const currentItems = JSON.parse(value);
        const date1 = new Date();
        const itemsInCompartment = currentItems.length;
        let closeToExpirationItems = 0;
        let expiredItems = 0;
        for (let i=0; i<currentItems.length; i++) {
          let numberOfDays = currentItems[i];
          const date2 = new Date(currentItems[i].expirationDate);
          let diffDays = Math.floor((date2.getTime() - date1.getTime())/(24*3600*1000))+1;
          if (diffDays < 0) { 
            expiredItems++;
          } else if (diffDays < 3) {
            closeToExpirationItems++;
          }
        }
        console.log(value);
        this.setState({itemsInCompartment});
        this.setState({closeToExpirationItems});
        this.setState({expiredItems});
      }
    } catch (error) {
      // Error retrieving data
      throw error;
    }
  }

  refresh() {
    this.getItem();
  }

  render() {

    const currentItemsInComponent = this.state.itemsInCompartment;
    const theCloseToExpiringItems = this.state.closeToExpirationItems;
    const theExpiredItems = this.state.expiredItems;

    return (
      <TouchableOpacity 
        style={[styles.button, styles.compartmentStyle]}
        onPress={() => {this.props.navigation.navigate(AppRoutes.compartmentPage.key, {compartment: this.props.compartmentName, refresh: this.refresh.bind(this)})}}
      >
        <Text style={styles.buttonText}>{this.props.compartmentName}</Text>
        <Text style={styles.itemComponentButtonText}>{currentItemsInComponent} item(s)</Text>
        <Text style={styles.itemComponentButtonText}>{theCloseToExpiringItems} item(s) are close to expiring.</Text>
        <Text style={styles.itemComponentButtonText}>{theExpiredItems} item(s) have expired.</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 26,
  },
  compartmentStyle: {
    flex: 1
  },
  itemComponentButtonText: {

  },
});
