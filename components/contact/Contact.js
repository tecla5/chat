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
export default class Contact extends Component {
  // expect to get an Id or a User?
  constructor(props){
    super(props);
    console.log('contact', props);
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
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}   
          />
        </TouchableWithoutFeedback>
              
        <TouchableWithoutFeedback onPress={this._toRoom.bind(this)}>              
          <Text>{ this.state.contact.name }</Text>
        </TouchableWithoutFeedback>
      </View>
            
    );
  }
  
  _toRoom(){
    Actions.room({ title: 'Hello', user: this.state.user, contact: this.state.contact });
  }  

  // do we send just Id or entire contact over?
  _toProfile(){
    Actions.profile(this.props.id);
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



