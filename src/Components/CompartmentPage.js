import React from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import DatePicker from 'react-native-datepicker';

export default class CompartmentPage extends React.Component {
  
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.compartment}`,
  });

  render() {
    const itemName = (
      <View>
        <Text>Item Name:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(itemName) => this.setState({itemName})}
          value={this.state.itemName}
        />
      </View>    
      )
    const purchaseDatePicker = (
      <View>
        <Text>Purchase Date</Text>
        <DatePicker 
          style={styles.datePicker}
          date={this.state.purchaseDate}
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
          onDateChange={(purchaseDate) => {this.setState({purchaseDate: purchaseDate})}}
        />
      </View>
    );
    let expiringDatePicker = null;
    if (this.state.purchaseDate !== undefined) {
      expiringDatePicker = (
        <View>
          <Text>Expiration Date</Text>
          <DatePicker 
            style={styles.datePicker}
            date={this.state.expirationDate}
            mode="date"
            minDate={this.state.purchaseDate}
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
            onDateChange={(expirationDate) => {this.setState({expirationDate: expirationDate})}}
          />
        </View>
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
        </PopupDialog>
        <ScrollView>

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
});
