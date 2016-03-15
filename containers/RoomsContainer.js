import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

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
  }

  // Sync with firebase: user-1/rooms            
  get endpoint() {
    return [this.props.userId || 'user-1', 'rooms'].join('/')    
  }          
          
  componentWillMount(){      
    super.componentWillMount();    
    // fake rooms
    this.setState({
      rooms: this.state.rooms.concat(fakeRooms) 
    });              
  }  
  
  componentDidMount(){    
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
