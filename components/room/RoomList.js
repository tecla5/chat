'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Room from './Room';

export default class RoomList extends Component {

  constructor(props){
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      rooms: ds.cloneWithRows(this.props.rooms),
    };    
  }
            
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={ this.state.rooms } renderRow={this._renderRoom}/>
      </View>      
    );
  }
  
  _renderRoom(msg) {
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
