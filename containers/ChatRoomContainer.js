import React, {
  StyleSheet
} from 'react-native';

import {sliceList} from '../utils';
import FirebaseContainer from './FirebaseContainer';

import ChatRoom from '../components/room/ChatRoom.js';

// number of messages to display as latest (how many messages appear initially in ListView)
const constants = {
  showMessageCount: 10
};

export default class ChatRoomContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    // TODO: should be: [roomId]/messages 
    this._endpoint = [props.roomId || 'room-1', 'messages'].join('/');;
  }
  
  initialState() {
    return {
      messages: [],
      message: null,
      show: null, // ??    
    }
  }  
  
  // Define how the context looks like
  getChildContext() {
    return {
      adapter: this.adapter
    }
  }
  
  _onSync(){  
    console.log('syncing', this._endpoint);
      // sort messages into earlier and latest
    const sliced = sliceList(this.state.messages, constants.showMessageCount)
    this.setState({
      earlier: sliced.before,
      latest: sliced.after
    });   
  }
       
  render(){
    return (    
        <ChatRoom {...this.state}/>                    
    );
  }  
}

// Make adapter available for child components
ChatRoomContainer.childContextTypes = {
  adapter: React.PropTypes.object
}
