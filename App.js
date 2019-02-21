import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/components/Login'
import Chat from './src/components/Chat';
import ContactChat from './src/components/ContactChat';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Chat: {
      screen: Chat
    },
    ContactChat: {
      screen: ContactChat
    }
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}