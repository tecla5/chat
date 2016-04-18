'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View,
  Image
} from 'react-native';

import TouchableWithoutFeedback from 'TouchableWithoutFeedback';
import Button from 'react-native-button';

import RNRF, {
  Route, 
  Schema, 
  Animations, 
  Actions, 
  TabBar
} from 'react-native-router-flux';

/*
  Expected data format for a contact: (really just a User - but showing less details)
  {
    userId: 'kmandrup',
    fullName: 'Kristian Mandrup',
    email: 'kmandrup@gmail.com'
  }
*/

import Rebase from 're-base';
let base = Rebase.createClass('https://t5-chat.firebaseio.com');


export default class Contact extends Component {
  // expect to get an Id or a User?
  constructor(props){
    super(props);
    this.state = {
        user: props.user,
        contact: props.contact
    }
    
  }
  
  // TODO: subdivide into smaller components  
  render(){
    return (      
      <View style={styles.contact} >
        <TouchableWithoutFeedback onPress={this._toProfile.bind(this)}>
          <Image
              style={styles.icon}
              source={{uri: this.state.contact.photo || 'http://facebook.github.io/react/img/logo_og.png'}}   
          />
        </TouchableWithoutFeedback>
              
        <TouchableWithoutFeedback onPress={this._toRoom.bind(this)}>              
          <Text>{ this.state.contact.name }</Text>
        </TouchableWithoutFeedback>
      </View>
            
    );
  }
  
  _toRoom(){
      // create room
      var roomName = this.state.contact.name;
      var roomType = 'private'; 
      this.createRoom(roomName, roomType, function(){
          console.log('created room');
      } );
      
    Actions.chat({ title: this.state.contact.name, user: this.state.user, contact: this.state.contact });
  }  

  // do we send just Id or entire contact over?
  _toProfile(){
    Actions.profile(this.props.id);
  }
  
  
  createRoom(roomName, roomType, callback) {
    var self = this;
    //var newRoomRef = this._roomRef.push();        

    var newRoom = {
      id: `${this.state.user.id}_${this.state.contact.id}`,
      title: roomName,
      type: roomType || 'public',
      createdByUserId: this.state.user.id,
      //createdAt: Firebase.ServerValue.TIMESTAMP
    };

/*    if (roomType === 'private') {
      newRoom.authorizedUsers = {};
      newRoom.authorizedUsers[this._userId] = true;
    }
*/
    //base.push('rooms', {
    base.post(`rooms/${this.state.user.id}_${this.state.contact.id}`, {
        data: newRoom,
        then: function(){
            //Router.transitionTo('dashboard');
            console.log('room created');
        }
    });        


    /*
    newRoomRef.set(newRoom, function(error) {
      if (!error) {
        self.enterRoom(newRoomRef.key());
      }
      if (callback) {
        callback(newRoomRef.key());
      }
    });
    */
    
  }  
  
  
}

// define PropTypes

const styles = StyleSheet.create({
  contact: {
    margin: 4,
    backgroundColor:'#ef553a',
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



