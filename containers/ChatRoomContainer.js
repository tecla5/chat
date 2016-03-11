import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

import Rebase from 're-base';

import ChatRoom from '../components/room/ChatRoom.js';

const base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class ChatRoomContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      message: null,
      show: null
    }
  }
  
  componentWillMount(){
    /*
     * We bind the 'chats' firebase endopint to our 'messages' state.
     * Anytime the firebase updates, it will call 'setState' on this component
     * with the new state.
     *
     * Any time we call 'setState' on our 'messages' state, it will
     * updated the Firebase '/chats' endpoint. Firebase will then emit the changes,
     * which causes our local instance (and any other instances) to update
     * state to reflect those changes.
     */

    this.ref = base.syncState('messages', {
      context: this,
      state: 'messages',
      asArray: true
    });
  }
  
  componentWillUnmount(){
    /*
     * When the component unmounts, we remove the binding.
     * Invoking syncState (or bindToState or listenTo)
     * will return a reference to that listener (see line 30).
     * You will use that ref to remove the binding here.
     */

    base.removeBinding(this.ref);
  }
     
  render(){
    return (    
        <ChatRoom {...this.state}/>                    
    );
  }  
}
