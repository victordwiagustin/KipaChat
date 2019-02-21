import React from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Chat from '../Chat';
import ContactChat from '../ContactChat';

export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Login'
  }

  state = {
    user: ''
  }

  // onLogin = () => {
  //   this.props.navigation.navigate('Chat', {userId: this.state.user});
  // }

  render() {
    // const { navigate } = this.props.navigation;

    return (
      <View style={styles.base}>
        <TextInput
          placeholder="UserId"
          value={this.state.user}
          onChangeText={(text) => this.setState({ user: text })}
        />
        <Button
          title='Login'
          onPress={() => {
            console.log(this.state.user);
            this.props.navigation.navigate('ContactChat', { 'userId': this.state.user });
          }} />
      </View>
    );
  }
}

// const AppNavigator = createStackNavigator({
//   Login: {
//     screen: Login
//   },
//   Chat: {
//     screen: Chat
//   },
//   ContactChat: {
//     screen: ContactChat
//   }
// });

// export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})