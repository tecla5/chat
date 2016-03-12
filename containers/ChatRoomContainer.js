import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

import utils from '../utils';
import FirebaseAdapter from '../adapters/FirebaseAdapter';

import ChatRoom from '../components/room/ChatRoom.js';

// number of messages to show as latest (which appear initially in listview)
const constants = {
  showMessageCount: 10
};

const base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class ChatRoomContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      message: null,
      show: null,
      loading: true // loading messages... show indicator
    }
  }
  
  componentWillMount(){
    /*
     * We bind the 'messages' firebase endopint to our 'messages' state.
     * Anytime the firebase updates, it will call 'setState' on this component
     * with the new state.
     *
     * Any time we call 'setState' on our 'messages' state, it will
     * updated the Firebase '/chats' endpoint. Firebase will then emit the changes,
     * which causes our local instance (and any other instances) to update
     * state to reflect those changes.
     */
    
    // TODO: use FirebaseAdapter
    this.adapter = new FirebaseAdapter({endpoint: 'messages'});

    // will sync messages on state
    this.adapter.syncState({onSuccess: this._onSync, ctx: this});
  }

  _onSync(){  
      // sort messages into earlier and latest
    const sliced = utils.sliceList(this.state.messages, constants.showMessageCount)
    this.setState({
      earlier: sliced.before,
      latest: sliced.after
    });
    
    this.state.loading = false; // hides load indicator!
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

  componentDidMount() {
  }
     
  render(){
    return (    
        <ChatRoom {...this.state} adapter={this.adapter}/>                    
    );
  }  
}
