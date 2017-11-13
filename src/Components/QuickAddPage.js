import React from 'react';
import { FlatList, Keyboard, StatusBar, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';

export default class QuickAddPage extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      category: '',
      visible: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
         <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
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
                  this.setState({visible: true});
                  fetch("http://www.stilltasty.com/searchitems/search", {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                      'Referer': 'http://www.stilltasty.com/',
                      'Origin': 'http://www.stilltasty.com',
                    },
                    body: JSON.stringify({'search': this.state.category})
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState({bodyText: JSON.parse(response._bodyText), bodyInit: JSON.parse(response._bodyInit)});
                      this.swiper.scrollBy(1);
                       this.setState({visible: false});
                    } else {
                       this.setState({visible: false});
                      Alert.alert(response);
                    }
                  });
                  
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
