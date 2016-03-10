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
    
  render() {
    console.log('ChatRoom:props', this.props);
    
    return (
        <View style={styles.container}>
            <MessageList messages={this.props.messages} />
            <WriteMessage message={this.props.message} />
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
