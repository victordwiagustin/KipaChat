import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  NativeModules
} from 'react-native';

const ChatManager = NativeModules.ChatManager;

export default class ContactChat extends  React.Component {

  state = {
    contacts: ['user1', 'user2'],
    userId: '',
    PASSWORD: '12345'
  }

  static navigationOptions = {
    title: 'ContactChat'
  }

  componentWillMount() {
    const userId = this.props.navigation.getParam('userId', null);
    this.setState({ userId: userId });
    ChatManager.setConnection(userId, this.state.PASSWORD);
  }

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    // const itemValue = item;
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.rowText} onPress={
          () => {
            console.log(item)
            navigate('Chat', {
              'userId': this.state.userId,
              'recipient': item
            });
          }}>
          <Text style={styles.sender}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.contacts}
          renderItem={this._renderItem}
          onC
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  }
});