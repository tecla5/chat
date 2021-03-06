'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import TouchableWithoutFeedback from 'TouchableWithoutFeedback';

import { Actions } from 'react-native-router-flux'

/*
  Expected data format for a room:
  {
    roomId: 'two',
    started: {
      by: 'kmandrup',
      time: 1458149252615
    },
    members: [
      'kmandrup',
      'jcabrera'
    ]
  }
*/
export default class Room extends Component {
  constructor(props){
    super(props);
    console.log('room', props);
  }
  
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
    Actions.room(this.props.id);
  } 
}

// define PropTypes

const styles = StyleSheet.create({
  room: {
    margin: 2,
    backgroundColor:'#bbaa99',
    width:300,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20, 
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 1,   
    flexDirection:'row',
  },
  icon: {
    width: 40, 
    height: 40,
    marginRight:30,
  }  
});



