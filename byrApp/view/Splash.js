'use strict';

import React from 'react';

import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

var Animated = require('Animated');

var WINDOW_WIDTH = Dimensions.get('window').width;

var SplashScreen = React.createClass({
  getInitialState: function() {
    return {
      bounceValue: new Animated.Value(1),
    };
  },
  componentDidMount: function() {
    // this.fetchData();
    // FIXME 去掉更换背景的需求
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.2,
        duration: 5000,
      }
    ).start();
  },
  render: function() {
    var text = '董崇洋';
    console.log(require('image!splash'));
    return(
      <View style={styles.container}>
        <Image
          source={require('image!splash')}
          style={{
            flex: 1
          }} />
        <Text style={styles.text}>
            @dcy0701
        </Text>
        <Image style={styles.logo} source={require('image!splash_logo')} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width:300,
    flexDirection: 'column',
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    height: 54,
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: 'transparent',
  }
});

module.exports = SplashScreen;
