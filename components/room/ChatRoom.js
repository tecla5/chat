'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Conversation from './Conversation.js';

export default class ChatRoom extends Component {
  constructor(props){
    super(props);
  }
    
  render() {
    return (
        <View style={styles.container}>
          <Text>Chat Messenger</Text>
          <Conversation {...this.props} />
        </View>                    
    );
  }
}

// ChatRoom.propTypes = { 
//   messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
//   message: React.PropTypes.string
// }

import { useCommon } from '../../styles';
const styles = useCommon('container');
