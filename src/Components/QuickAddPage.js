import React from 'react';
import { FlatList, Keyboard, StatusBar, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

export default class QuickAddPage extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      category: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
        />
        <Swiper 
          ref={(swiper) => { this.swiper = swiper; }} 
          style={styles.wrapper} 
          showsButtons={false} 
          scrollEnabled={false} 
          showsPagination={false}
        >
          <View style={styles.slide1}>
            <Text style={styles.slide1Text}>Type item name.</Text>
            <TextInput
              ref={(nameInput) => { this.nameInput = nameInput; }}
              style={styles.slide1TextInput}
              onChangeText={(itemName) => {
                this.setState({itemName: itemName})
              }}
              returnKeyType='next'
              onSubmitEditing={() => { this.categoryInput.focus() }}
              value={this.state.itemName}
            />
            <Text style={styles.slide1Text}>Type category.</Text>
            <TextInput
              ref={(categoryInput) => { this.categoryInput = categoryInput; }}
              style={styles.slide1TextInput}
              onChangeText={(category) => {
                this.setState({category: category})
              }}
              blurOnSubmit={true}
              value={this.state.category}
            />
            <TouchableOpacity
              onPress={() => {
                if (this.state.itemName !== '' && this.state.category !== '') {
                  this.nameInput.blur();
                  this.categoryInput.blur();
                  Keyboard.dismiss();
                  this.swiper.scrollBy(1);
                }
              }}
            >
              <Text style={styles.slide1Text}>next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
            <TouchableOpacity
              onPress={() => {
                this.swiper.scrollBy(1);
              }}
            >
              <Text style={styles.slide1Text}>next</Text>
            </TouchableOpacity>
            <FlatList>
            </FlatList>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
            <TouchableOpacity
              onPress={() => {

              }}
            >
              <Text style={styles.slide1Text}>Freezer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

              }}
            >
              <Text style={styles.slide1Text}>Refrigerator</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

              }}
            >
              <Text style={styles.slide1Text}>Counter Top</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
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
  },
  wrapper: {

  },
  slide1: {

  },
  slide1Text: {
    color: 'white'
  },
  slide1TextInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    color: 'white'
  },
  slide2: {

  },
  slide3: {

  },
});
