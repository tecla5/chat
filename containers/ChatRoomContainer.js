import React, {
  StyleSheet
} from 'react-native';

import utils from '../utils';
import FirebaseContainer from './FirebaseContainer';

import ChatRoom from '../components/room/ChatRoom.js';

// number of messages to display as latest (how many messages appear initially in ListView)
const constants = {
  showMessageCount: 10
};

// Make adapter available for child components
ChatRoomContainer.childContextTypes = {
  adapter: React.PropTypes.object
}

export default class ChatRoomContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    // TODO: should be: [userId]/[conversationId]/messages 
    this._endpoint = 'messages';
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
    const sliced = utils.sliceList(this.state.messages, constants.showMessageCount)
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
