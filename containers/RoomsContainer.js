import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RoomList from '../components/room/RoomList';

const fakeRooms = [{
    id: 1,
    title: 'Room #1',
  }, {
      id: 2,
      title: 'Room #2',
  }];

export default class RoomsContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    this._endpoint = [props.userId || 'user-1', 'rooms'].join('/');        
  }
          
  componentWillMount(){      
    super.componentWillMount();    
    // fake rooms
    this.setState({rooms: this.state.rooms.concat(fakeRooms) });      
    console.log('componentWillMount',this.state.rooms);        
  }  
  
  componentDidMount(){
    // console.log('componentDidMount',this.state.rooms);    
  }  
    
  render() {
    return (
      <View style={styles.container}>
        <RoomList rooms={ this.state.rooms } />
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
