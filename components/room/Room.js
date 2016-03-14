'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View,
  Image
} from 'react-native';
var TouchableWithoutFeedback = require('TouchableWithoutFeedback');

import Button from 'react-native-button';


import RNRF from 'react-native-router-flux';

const {
  Route, 
  Schema, 
  Animations, 
  Actions, 
  TabBar
} = RNRF;



export default class Room extends Component {
  // define PropTypes
  
  render(){
    return (
      <TouchableWithoutFeedback onPress={this._toRoom.bind(this)}>
      <View style={styles.room} >
        <Image
            style={styles.icon}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}   />      
        <Text>{ this.props.title }</Text>
      </View>
      </TouchableWithoutFeedback>      
    );
  }
  
  _toRoom(){
    console.log('toRoom: ', this.props);
    Actions.room(this.props.id);
  }
  
}



/*
        <Button onPress={Actions.enterRoom(this.props.id)} />
*/


const styles = StyleSheet.create({
  room: {
    margin: 2,
    backgroundColor:'#bbaa99',
    width:300,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    //paddingRight:20, 
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 1,
    

    //flex:1,
    //alignItems:'flex-start',// stretch center flex-start , flex end
    flexDirection:'row', // column row
    //justifyContent:'center'
  },
  icon: {
    width: 40, 
    height: 40,
    marginRight:30,
    //flex: 0.1
  }
  
});



