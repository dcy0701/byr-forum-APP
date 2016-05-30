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
  AsyncStorage
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

import SplashScreen from './view/Splash';

var byrApp = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function(){
    return{
      splashed :true,//这个是载入页面动画
      login: 1// 1初始 0没有登录信息 2 登录失败 3 登录成功
    }
  },
  componentDidMount:function(){
    
    this.setTimeout(//清理计时器 需要加入mixin FIXME
      ()=> {
        this.setState({splashed:false});
        //console.log(this.state);
    },2000);
  },
  logout(){
    AsyncStorage.removeItem('loginStatus',function(err){
      console.log(err);
    }).then(function(){
      console.log('！！！！调用了退出，传递给了index');
      this.setState({login:0});
    }.bind(this));
  },
  render: function() {
    return (
      //这里是载入动画 done FIXME
      <SplashScreen />
    )
    // if (this.state.splashed||this.state.login==1) {
      // return (
      //   //这里是载入动画 done FIXME
      //   <SplashScreen />
    //   );
    // }else if(this.state.login==2||this.state.login==0){
    //   return (
    //       <Login status={this.state.login}/>
    //     //这里是 登录页面 TODO
    //   )
    // }else if(this.state.login==3){
    //   // 这里是导航页面  TODO
    //   return(
    //     <Home logout={this.logout} test='test'/>
    //   )

    // }
  },


});


// <View style={styles.container}>
//   <Text style={styles.welcome}>
//     自动登录成功  进入没有做出来的主页
//   </Text>
// </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('byrApp', () => byrApp);
