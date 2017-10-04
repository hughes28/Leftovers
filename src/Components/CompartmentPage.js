import React from 'react';
import { AsyncStorage, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import Swipeout from 'react-native-swipeout';
import DatePicker from 'react-native-datepicker';

export default class CompartmentPage extends React.Component {

  constructor(props) {
    super(props);
    this.getItem(props);
    this.addItem = this.addItem.bind(this);
    this.state = {
      newItem: {},
      curItem: {},
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

  async deleteItem(index) {
    try {
      const title = this.props.navigation.state.params.compartment;
      const currentItems = [...this.state.currentItems];
      currentItems.splice(index, 1);
      await AsyncStorage.setItem(title, JSON.stringify(currentItems));
      this.setState({
        newItem: {},
        currentItems: currentItems,
      });
    } catch (error) {
      throw error
    // Error saving data
    }
  }

  async editItem() {
    try {
      const title = this.props.navigation.state.params.compartment;
      const currentItems = [...this.state.currentItems];
      const editingIndex = this.state.editingIndex;
      const curIndexData = currentItems[editingIndex];
      curIndexData.itemName = this.state.curItem.itemName;
      curIndexData.purchaseDate = this.state.curItem.purchaseDate;
      curIndexData.expirationDate = this.state.curItem.expirationDate;
      await AsyncStorage.setItem(title, JSON.stringify(currentItems));
      this.popupDialog.dismiss();
      this.setState({
        curItem: {},
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
            if (this.state.editingIndex === undefined) {
              const newItem = {...this.state.newItem}; // notation for clone
              newItem.itemName = itemName;
              this.setState({newItem: newItem});
            } else {
              const curItem = {...this.state.curItem}; // notation for clone
              curItem.itemName = itemName;
              this.setState({curItem: curItem});
            } 
          }}
          value={
            this.state.editingIndex === undefined ? this.state.newItem.itemName : this.state.curItem.itemName
          }
        />
      </View>
      )
    const purchaseDatePicker = (
      <View>
        <Text>Purchase Date</Text>
        <DatePicker
          style={styles.datePicker}
          date={
            this.state.editingIndex === undefined ? this.state.newItem.purchaseDate : this.state.curItem.purchaseDate
          }
          mode="date"
          maxDate={new Date()}
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
            if (this.state.editingIndex === undefined) {
              const newItem = {...this.state.newItem}; // notation for clone
              newItem.purchaseDate = purchaseDate;
              this.setState({newItem: newItem});
            } else {
              const curItem = {...this.state.curItem}; // notation for clone
              curItem.purchaseDate = purchaseDate;
              this.setState({curItem: curItem});
            } 
          }}
        />
      </View>
    );
    let expiringDatePicker = null;
    if (this.state.newItem.purchaseDate !== undefined || this.state.curItem.purchaseDate !== undefined) {
      expiringDatePicker = (
        <View>
          <Text>Expiration Date</Text>
          <DatePicker
            style={styles.datePicker}
            date={
              this.state.editingIndex === undefined ? this.state.newItem.expirationDate : this.state.curItem.expirationDate
            }
            mode="date"
            minDate={
              this.state.editingIndex === undefined ? this.state.newItem.purchaseDate : this.state.curItem.purchaseDate
            }
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
              if (this.state.editingIndex === undefined) {
                const newItem = {...this.state.newItem}; // notation for clone
                newItem.expirationDate = expirationDate;
                this.setState({newItem: newItem});
              } else {
                const curItem = {...this.state.curItem}; // notation for clone
                curItem.expirationDate = expirationDate;
                this.setState({curItem: curItem});
              } 
            }}
          />
        </View>
      );
    }
    let popupAddButton = null;
    if (this.state.editingIndex === undefined && this.state.newItem.itemName && this.state.newItem.purchaseDate && this.state.newItem.expirationDate) {
      popupAddButton = (
        <Button
          style={styles.addItemButton}
          title="Add"
          onPress={() => {
            this.addItem();
          }}
        />
      );
    } else if (this.state.editingIndex !== undefined && this.state.curItem.itemName && this.state.curItem.purchaseDate && this.state.curItem.expirationDate) {
      popupAddButton = (
        <Button
          style={styles.addItemButton}
          title="Edit"
          onPress={() => {
            this.editItem();
          }}
        />
      );
    }
      
    let currentItemEntries = null;
    const currentList = this.state.currentItems;
    if (currentList) {
      currentItemEntries = (
        <FlatList
          data={currentList}
          renderItem={({item, index}) => {
            const swipeoutBtns = [
              {
                text: 'Edit',
                color: '#FFFFFF',
                backgroundColor: '#F99526',
                onPress: () => {
                  this.setState({
                    editingIndex: index,
                    curItem: currentList[index],
                  });
                  this.popupDialog.show();
                }
              },
              {
                text: 'Delete',
                color: '#FFFFFF',
                backgroundColor: '#F92672',
                onPress: () => {
                  this.deleteItem(index);
                }
              },
            ];
            const date1 = new Date();
            const date2 = new Date(item.expirationDate);
            let diffDays = Math.floor((date2.getTime() - date1.getTime())/(24*3600*1000))+1;
            let timeLeft = `${diffDays} day(s) until expiration.`;
            if (diffDays === 0) {
              timeLeft = "Expires today.";
            }
            else if (diffDays < 0) {
              timeLeft = `Expired ${-diffDays} day(s) ago.`;
            }
            return (
              <Swipeout style={styles.currentItems} right={swipeoutBtns}>
                <View>
                  <Text> Item: {item.itemName} </Text>
                  <Text> Purchase Date: {item.purchaseDate} </Text>
                  <Text> Expiration Date: {item.expirationDate} </Text>
                  <Text> {timeLeft} </Text>
                  <TouchableOpacity
                    onPress={() => {this.deleteItem(index)}}
                  >
                    <Text>Consume</Text>
                  </TouchableOpacity>
                </View>
              </Swipeout>
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
