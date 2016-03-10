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
    return (
        <View style={styles.container}>
            <MessageList messages={this.state.messages} />
            <WriteMessage message={this.state.message} />
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
