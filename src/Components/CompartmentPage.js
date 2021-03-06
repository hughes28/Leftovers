import React from 'react';
import { AsyncStorage, Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import Swipeout from 'react-native-swipeout';
import DatePicker from 'react-native-datepicker';
import images from '../images.js';

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

  async addItem() {
    try {
      const title = this.props.navigation.state.params.compartment;
      const newItem = {...this.state.newItem};
      newItem.key = Math.random();
      const currentItems = [...this.state.currentItems];
      currentItems.push(newItem);
      await AsyncStorage.setItem(title, JSON.stringify(currentItems));
      this.props.navigation.state.params.refresh();
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
      this.props.navigation.state.params.refresh();
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
      this.props.navigation.state.params.refresh();
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
                color: '#000000',
                backgroundColor: '#E6DB74',
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
            let statusStyle = [styles.currentItemsEntry];
            if (diffDays > 3) {
              statusStyle.push(styles.normal);
            } else if (diffDays > 0) {
              statusStyle.push(styles.warning);
            } else {
              statusStyle.push(styles.error);
            };
            return (
              <Swipeout style={styles.currentItems} right={swipeoutBtns}>
                <View style={statusStyle}>
                  <View style={{flex: 4}}>
                    <Text style={styles.currentItemsItemNameText}>{item.itemName}</Text>
                    <Text style={styles.currentItemsText}>Purchase Date: {item.purchaseDate}</Text>
                    <Text style={styles.currentItemsText}>Expiration Date: {item.expirationDate}</Text>
                    <Text style={styles.currentItemsText}>{timeLeft}</Text>
                  </View>
                  <View style={styles.consumeBtnContainer}>
                    <TouchableOpacity
                      onPress={() => {this.deleteItem(index)}}
                    >
                      <Image
                        style={styles.imageStyle}
                        source={images.checkmark}
                      />
                    </TouchableOpacity>
                  </View>
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
          onDismissed={() => {
            this.setState({editingIndex: undefined});
          }}
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
    backgroundColor: '#272822',
    paddingTop: 23,
  },
  popup: {
    flex: 1,
    margin: 10,
    zIndex: 1000,
  },
  addItemButton: {
    position: 'absolute',
    bottom: 0,
  },
  datePicker: {
    width: 200,
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
  },
  currentItems: {
    flex: 1,
    backgroundColor: '#272822',
    alignItems:'center',
    paddingTop: 1,
  },
  currentItemsItemNameText: {
    color: '#FFF',
    fontSize: 23,
  },
  currentItemsEntry: {
    padding: 8,
    width: '100%',
    flexDirection: 'row',
  },
  currentItemsText: {
    color: '#FFF'
  },
  normal: {
    backgroundColor: 'rgba(161,226,46,0.5)',
  },
  warning: {
    backgroundColor: 'rgba(230,219,116,0.5)',
  },
  error: {
    backgroundColor: 'rgba(249,38,114,0.5)',
  },
  consumeText: {
    color: '#A4E22E',

  },
  imageStyle: {
    width: 30,
    height: 30, 
    resizeMode: 'contain'
  },
  consumeBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    flex: 1
  }
});
