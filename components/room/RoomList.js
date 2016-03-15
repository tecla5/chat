'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import List from '../base/List';
import Room from './Room';

export default class RoomList extends List {
  constructor(props){
    super(props);
    this.state = {
      rooms: this._dataSource().cloneWithRows(this.props.rooms),
    };    
  }
            
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={ this.state.rooms } renderRow={this._renderRow}/>
      </View>      
    );
  }
  
  _renderRow(msg) {
    return <Room {...msg}/>;
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
