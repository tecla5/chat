'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MessageList from '../message/MessageList.js';
import WriteMessage from '../message/WriteMessage.js';

export default class ChatRoom extends Component {
  constructor(props){
    super(props);
    console.log('create:ChatRoom', props);
  }
    
  render() {
    console.log('ChatRoom:props', this.props);
    
    return (
        <View style={styles.container}>
            <MessageList {...this.props} />
            <WriteMessage {...this.props} />
        </View>                    
    );
  }
}

// ChatRoom.propTypes = { 
//   messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
//   message: React.PropTypes.string
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
