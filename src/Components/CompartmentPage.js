import React from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

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
    return (
      <View style={styles.container}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View style={styles.popup}>
            <Text>Hello</Text>
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
  }
});
