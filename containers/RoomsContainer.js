import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

//import Firebase from 'firebase';
import Rebase from 're-base';

import RoomList from '../components/room/RoomList';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class RoomsContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      rooms: []
    };
        
  }
          
  componentWillMount(){      
      
    /*
    * Here we call 'bindToState', which will update
    * our local 'messages' state whenever our 'chats'
    * Firebase endpoint changes.
    */
    //base.bindToState('rooms', {
    base.syncState('rooms', {
      context: this,
      state: 'rooms',
      asArray: true
    });
    
    // fake rooms
    this.setState({
        rooms:  this.state.rooms.concat({
            id: 1,
            title: 'Javier Cabrera',
        }    ,
    {
        id: 2,
        title: 'Kristian Mandrup',
    }
        ) //updates Firebase and the local state
    });      
    
    
      console.log('componentWillMount',this.state.rooms);    
    
  }  
  
  componentDidMount(){
    console.log('componentDidMount',this.state.rooms);    
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
