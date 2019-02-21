import React, { Component } from 'react';
import Header from './Header';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  NativeModules
} from 'react-native';

// const USERNAME = 'user2';
// const PASSWORD = '12345';

// const RECIPIENT = 'user2';
// const DOMAIN = '';

const CHANNEL = 'Random';
const AVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJAphULNuqLgHTtO8SQt81qioLjjjA073QUlgwW8pkgOQW9orBhg';

const ChatManager = NativeModules.ChatManager;

export default class Chat extends  React.Component {
  static navigationOptions = {
    title: 'Chat'
  }

  state = {
    USERNAME: '',
    PASSWORD: '12345',
    typing: '',
    messages: [],
    RECIPIENT: ''
  };

  componentWillMount() {
    const userId = this.props.navigation.getParam('userId', null);
    const recipient = this.props.navigation.getParam('recipient', null);
    console.log(userId);
    console.log(recipient);
    this.setState(
      {
        USERNAME: userId,
        RECIPIENT: recipient
      }
    );

    console.log(userId);
    // ChatManager.setConnection(userId, this.state.PASSWORD);
  }

  _sendMessage = () => {
    const message = this.state.typing;

    const newMessage = {
      channel: CHANNEL,
      sender: this.state.USERNAME,
      avatar: AVATAR,
      message,
      sendDate: Date.now()
    };

    this.setState({
      typing: '',
      messages: [...this.state.messages, newMessage]
    });

    //send to xmpp
    ChatManager.sendMessage(message, this.state.RECIPIENT);
  };

  _renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <Header title={this.state.RECIPIENT} />

        <FlatList
          data={this.state.messages.sort((a, b) => parseFloat(b.sendDate) - parseFloat(a.sendDate))}
          renderItem={this._renderItem}
          inverted
        />

        <KeyboardAvoidingView >
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              returnKeyType="done"
              onChangeText={text => this.setState({ typing: text })}
            />
            {/* <TouchableOpacity onPress={this.sendMessage}> */}
            <TouchableOpacity onPress={this._sendMessage}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
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