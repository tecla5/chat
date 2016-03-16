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
  Expected data format for a contact:
  {
    userId: 'kmandrup',
    fullName: 'Kristian Mandrup',
    email: 'kmandrup@gmail.com'
  }
*/
export default class Contact extends Component {
  // define PropTypes
  
  render(){
    return (
      <TouchableWithoutFeedback onPress={this._toRoom.bind(this)}>
      <View style={styles.contact} >
        <Image
            style={styles.icon}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}   />      
        <Text>{ this.props.name }</Text>
      </View>
      </TouchableWithoutFeedback>      
    );
  }
  
  _toRoom(){
    Actions.room(this.props.id);
  }
  
}
/*
        <Button onPress={Actions.enterRoom(this.props.id)} />
*/

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



