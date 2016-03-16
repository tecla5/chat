'use strict';

import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import Button from 'react-native-button';
import ImageButton from '../ImageButton';

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
      <View style={styles.listItem} >
        <ImageButton {...this.props} onPress={this._toRoom.bind(this)} />
        <Button onPress={this._toRoom.bind(this)}>{this.props.name}</Button>           
      </View>                  
    );
  }
  
  _toRoom(){
    Actions.room(this.props.id);
  } 
}

// TODO: define PropTypes

import { useCommon } from '../../styles';
const styles = useCommon('listItem');



