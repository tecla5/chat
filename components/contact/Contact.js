'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from 'react-native-button';
import ImageButton from '../ImageButton';

import { Actions } from 'react-native-router-flux';

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
    console.log('CONTACT', props);
  }
  
  // TODO: subdivide into smaller components  
  render(){
    return (      
      <View style={styles.listItem} >
        <ImageButton {...this.props} onPress={this._toProfile.bind(this)} />
        <View>
          <Button onPress={this._toRoom.bind(this)}>{this.props.fullName}</Button>
          <Text>{this.props.email}</Text>
        </View>               
      </View>            
    );
  }
  
  _toRoom(){
    Actions.room(this.props.id);
  }  

  // do we send just Id or entire contact over?
  _toProfile(){
    Actions.profile(this.props);
  }  
}

// TODO: define PropTypes

import { useCommon } from '../../styles';
const styles = useCommon('listItem');
