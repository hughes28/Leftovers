import React from 'react';
import { AsyncStorage, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import DatePicker from 'react-native-datepicker';

export default class CompartmentPage extends React.Component {

  constructor(props) {
    super(props);
    this.getItem(props);
    this.addItem = this.addItem.bind(this);
    this.state = {
      newItem: {},
      currentItems: [],
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.compartment}`,
  });

  async addItem() {
    try {
      const title = this.props.navigation.state.params.compartment;
      const newItem = {...this.state.newItem};
      newItem.key = Math.random();
      const currentItems = [...this.state.currentItems];
      currentItems.push(newItem);
      await AsyncStorage.setItem(title, JSON.stringify(currentItems));
      this.popupDialog.dismiss();
      this.setState({
        newItem: {},
        currentItems: currentItems,
      });
    } catch (error) {
      throw error
    // Error saving data
    }
  }

  async getItem(props) {
    try {
      const title = props.navigation.state.params.compartment;
      const value = await AsyncStorage.getItem(title);
      if (value !== null){
        // We have data!!
        const currentItems = JSON.parse(value);
        console.log(value);
        this.setState({currentItems});
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const itemName = (
      <View>
        <Text>Item Name:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(itemName) => {
            const newItem = {...this.state.newItem}; // notation for clone
            newItem.itemName = itemName;
            this.setState({newItem: newItem});
          }}
          value={this.state.newItem.itemName}
        />
      </View>
      )
    const purchaseDatePicker = (
      <View>
        <Text>Purchase Date</Text>
        <DatePicker
          style={styles.datePicker}
          date={this.state.newItem.purchaseDate}
          mode="date"
          placeholder="select date"
          format="LL"
          androidMode='spinner'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: styles.dateIcon,
            dateInput: styles.dateInput,
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(purchaseDate) => {
            const newItem = {...this.state.newItem}; // notation for clone
              newItem.purchaseDate = purchaseDate;
              this.setState({newItem: newItem});
          }}
        />
      </View>
    );
    let expiringDatePicker = null;
    if (this.state.newItem.purchaseDate !== undefined) {
      expiringDatePicker = (
        <View>
          <Text>Expiration Date</Text>
          <DatePicker
            style={styles.datePicker}
            date={this.state.newItem.expirationDate}
            mode="date"
            minDate={this.state.newItem.purchaseDate}
            placeholder="select date"
            format="LL"
            androidMode='spinner'
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput,
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(expirationDate) => {
              const newItem = {...this.state.newItem}; // notation for clone
              newItem.expirationDate = expirationDate;
              this.setState({newItem: newItem});
            }}
          />
        </View>
      );
    }
    let popupAddButton = null;
    if (this.state.newItem.itemName && this.state.newItem.purchaseDate && this.state.newItem.expirationDate) {
      popupAddButton = (
        <Button
          style={styles.addItemButton}
          title="Add"
          onPress={() => {
            this.addItem();
          }}
        />
      )
    }
    let currentItemEntries = null;
    const currentList = this.state.currentItems;
    if (currentList) {
      currentItemEntries = (
        <FlatList
          data={currentList}
          renderItem={({item}) => {
            const date1 = new Date();
            const date2 = new Date(item.expirationDate);
            let diffDays = Math.floor((date2.getTime() - date1.getTime())/(24*3600*1000));
            let timeLeft = `${diffDays} day(s) until expiration.`;
            if (diffDays === 0) {
              timeLeft = "Expires today.";
            }
            else if (diffDays < 0) {
              timeLeft = `Expired ${-diffDays} day(s) ago.`;
            }
            return (
              <View style={styles.currentItems}>
                <Text> Item: {item.itemName} </Text>
                <Text> Purchase Date: {item.purchaseDate} </Text>
                <Text> Expiration Date: {item.expirationDate} </Text>
                <Text> {timeLeft} </Text>
              </View>
            );
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View style={styles.popup}>
            {itemName}
            {purchaseDatePicker}
            {expiringDatePicker}
          </View>
          <View>
            {popupAddButton}
          </View>
        </PopupDialog>
        <ScrollView>
          {currentItemEntries}
        </ScrollView>
        <Button
          style={styles.addItemButton}
          title="Add new item"
          onPress={() => {
            this.popupDialog.show();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  popup: {
    flex: 1,
    margin: 10,
    zIndex: 1000
  },
  addItemButton: {
    position: 'absolute',
    bottom: 0
  },
  datePicker: {
    width: 200,
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 36
  },
  currentItems: {
    marginTop: 50,
  },
});
