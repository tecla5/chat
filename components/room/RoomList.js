'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import List from '../base/List';
import Room from './Room';
import fake from '../../fake'; 

/*
  Expected data format for each room:
  Will for now use fake.rooms if none provided by props
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
export default class RoomList extends List {
  constructor(props){
    super(props);
    this.state = {
      rooms: this._dataSource().cloneWithRows(this.props.rooms || fake.rooms),
    };    
  }
            
  render() {
    return (
      <View style={style.list}>
        <ListView dataSource={ this.state.rooms } renderRow={this._renderRow}/>
      </View>      
    );
  }
  
  _renderRow(room) {
    return <Room {...room}/>;
  }
  
}

import { merge, common } from '../../styles';

let style = merge({
    list: common.list
  },    
  // custom overrides
  // {}
); 
