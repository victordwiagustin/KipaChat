import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default class Header extends  React.Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="lightseagreen" barStyle="light-content" />
        <Text style={styles.title}>
          {/* {this.props.title} */}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});