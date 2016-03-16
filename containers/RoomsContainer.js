import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import RoomList from '../components/room/RoomList';

import { rooms } from '../fake';

export default class RoomsContainer extends FirebaseContainer {
  constructor(props){
    super(props);    
  }

  // Sync with firebase: user-1/rooms            
  get endpoint() {
    return [this.props.userId || 'user-1', 'rooms'].join('/')    
  }          
          
  componentWillMount() {      
    super.componentWillMount();    
    // fake rooms
    this.setState({
      rooms: this.state.rooms.concat(rooms) 
    });              
  }  
      
  render() {
    return (
      <View style={styles.container}>
        <RoomList rooms={ this.state.rooms } />
      </View>      
    );
  }
}

import { useCommon } from '../styles';
const styles = useCommon('container');
