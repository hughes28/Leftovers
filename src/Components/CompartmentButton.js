import React from 'react';
import { AsyncStorage, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppRoutes from '../Routes/AppRoutes';
import images from '../images.js';

export default class CompartmentButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      numItemsInCompartment: 0,
      numExpiredItems: 0,
      numCloseToExpirationItems: 0,
    }
  }

  componentWillMount() {
    this.getItem();
  }

  async getItem() {
    try {
      const title = this.props.compartmentName;
      const value = await AsyncStorage.getItem(title);
      let numCloseToExpirationItems = 0;
      let numExpiredItems = 0;
      let numNormalItems = 0;
      let numItemsInCompartment = 0;

      if (value !== null) {
        // We have data!!
        const currentItems = JSON.parse(value);
        const date1 = new Date();
        numItemsInCompartment = currentItems.length;

        for (let i=0; i<currentItems.length; i++) {
          let numberOfDays = currentItems[i];
          const date2 = new Date(currentItems[i].expirationDate);
          let diffDays = Math.floor((date2.getTime() - date1.getTime())/(24*3600*1000))+1;
          if (diffDays < 0) {
            numExpiredItems++;
          } else if (diffDays < 3) {
            numCloseToExpirationItems++;
          } else {
            numNormalItems++;
          }
        }
        console.log(value);
      }
      this.setState({numItemsInCompartment, numCloseToExpirationItems, numExpiredItems, numNormalItems});
    } catch (error) {
      // Error retrieving data
      throw error;
    }
  }

  refresh() {
    this.getItem();
  }

  render() {

    const { numItemsInCompartment, numCloseToExpirationItems, numExpiredItems, numNormalItems } = this.state;

    return (
      <TouchableOpacity
        style={[styles.button, styles.compartmentStyle]}
        onPress={() => {
          this.props.navigation.navigate(AppRoutes.compartmentPage.key, 
            {
              compartment: this.props.compartmentName, 
              refresh: this.refresh.bind(this)
            })}
        }
      >
        <View style={styles.compartmentTextContainer}>
          <Text style={[styles.buttonText, styles.buttonColorNormal]}>{this.props.compartmentName} ({numItemsInCompartment})</Text>
        </View>
        <View style={styles.statusImagesContainer}>
          <View>
            <Image
              style={styles.imageStyle}
              source={images.checkmark}
            />
            <Text style={styles.itemComponentButtonText}>{numNormalItems}</Text>
          </View>
          <View style={styles.statusImageCenterContainer}>
            <Image
              style={styles.imageStyle}
              source={images.caution}
            />
            <Text style={styles.itemComponentButtonText}>{numCloseToExpirationItems}</Text>
          </View>
          <View>
            <Image
              style={styles.imageStyle}
              source={images.error}
            />
            <Text style={styles.itemComponentButtonText}>{numExpiredItems}</Text>
          </View>
        </View>

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

  },
  buttonText: {
    fontSize: 26,
  },
  buttonColorNormal: {
    color: '#FFF',
  },
  buttonColorWarning: {
    color: '#FFF',
  },
  buttonColorError: {
    color: '#FFF',
  },
  compartmentStyle: {
    flex: 1
  },
  compartmentTextContainer: {
    flex: 1,
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    width: 35,
    height: 35, 
    resizeMode: 'contain'
  },
  itemComponentButtonText: {
    color: 'white',
    textAlign: 'center'

  },
  statusImagesContainer: {
    flex:2,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',

  },
  statusImageCenterContainer: {
    marginLeft:35,
    marginRight:35,
  }
});
