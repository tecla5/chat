import React, {
  View,
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
  }
  
  // Sync with firebase: user-1/rooms            
  get endpoint() {
    return [this.props.roomId || 'room-1', 'messages'].join('/');    
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

import { useCommon } from '../styles';
const styles = useCommon('container');

// Make adapter and container available for child components
ChatRoomContainer.childContextTypes = {
  adapter: React.PropTypes.object,
  container: React.PropTypes.object
}
