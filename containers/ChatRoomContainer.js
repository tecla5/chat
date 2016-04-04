import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

import {sliceList} from '../utils';
import FirebaseContainer from './FirebaseContainer';

import ChatRoom from '../components/room/ChatRoom';

// number of messages to display as latest (how many messages appear initially in ListView)
const constants = {
  showMessageCount: 10
};

type MessageType = {
    text:string;
    name:string;
    image:?Object;
    position:?string;
    date:Date;
    view:?any;
    isOld:boolean;
}


export default class ChatRoomContainer extends FirebaseContainer {

  constructor(props){
    super(props);
    console.log('props', props);
    this.state = {
      user: null,
      contact: null,
      messages: [],
      message: null,
      show: null, // ??    
    };       
    
  }
  
  componentWillMount(){
      
    this.state = {
      user: this.props.user,
      contact: this.props.contact,
      messages: [],
      message: null,
      show: null, // ??    
    };       
  }
  
  
  
// Sync with firebase: user-1/rooms            
  get endpoint() {
      
      var id1 = (this.props.user)? this.props.user.id : 'R1';
      var id2 = (this.props.contact)? this.props.contact.id : 'R2';
      var roomId = 'messages/' +id1+'_'+id2;
      console.log(roomId);
      return roomId;    
  }            
  
  
  // Define how the context looks like
  getChildContext() {
    return {
      adapter: this.adapter,
      container: this
    }
  }
  
  _onSync(){  
    console.log('syncing', this.endpoint);
      // sort messages into earlier and latest
    const sliced = sliceList(this.state.messages, constants.showMessageCount)
    this.setState({
      earlier: sliced.before,
      latest: sliced.after
    });   
  }

  render(){    
    return (
      <View style={styles.container}>
        <ChatRoom {...this.state} />  
      </View>                  
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'green',
  }
});


// Make adapter and container available for child components
ChatRoomContainer.childContextTypes = {
  adapter: React.PropTypes.object,
  container: React.PropTypes.object
}
