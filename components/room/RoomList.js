'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import List from '../base/List';
import Room from './Room';

/*
  Expected data format for each room:
  Will for now use fake.rooms if none provided by props
*/
export default class RoomList extends List {
  constructor(props){
    super(props);
    this.state = {
      rooms: this.props.rooms || []
    };    
  }
            
  render() {
      
    var roomDs = [];
    if (this.props.rooms){
        roomDs = this._dataSource().cloneWithRows(this.props.rooms);
    }
    
    return (
      <View style={styles.list}>
        <ListView dataSource={ roomDs } renderRow={this._renderRow}/>
      </View>      
    );
  }
  
  _renderRow(room) {
    return <Room {...room}/>;
  }
  
}

import { merge, common } from '../../styles';

const styles = merge({
    list: common.list
  },    
  // custom overrides
  // {}
); 
