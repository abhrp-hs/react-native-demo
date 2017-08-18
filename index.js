/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';

export default class FirstDemo extends Component {
  render() {
    let pic = {uri: 'https://media4.popsugar-assets.com/files/2015/06/01/782/n/1922398/af0f7c22_Come-at-me-bro.xxxlarge.gif'};
    return (
      <ScrollView>
        <Text style={styles.bodyText}>Hello World</Text>
        <Text style={styles.bodyText}>Look what i found</Text>
        <Text style={styles.bodyText}>Tan tan tana tan tan tana tan tan...</Text>
        <Image source={pic} style={{width: 500, height: 400}}/>
        <Westeros name='Stark'></Westeros>
        <Westeros name="Targaryen"></Westeros>
        <Westeros name="Lannister"></Westeros>
        <Westeros name="Baratheon"></Westeros>
        <Westeros name="Greyjoy"></Westeros>
      </ScrollView>
    );
  }
}

// Creating custom components
class Westeros extends Component {
  render() {
    return (
      <Text style={styles.bigText}>House {this.props.name}</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#00000000',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  bodyText: {
    fontSize: 20,
    textAlign: 'left',
    margin: 5
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('FirstDemo', () => FirstDemo);
