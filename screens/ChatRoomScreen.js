'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';


import ChatRoomContainer from '../containers/ChatRoomContainer';
import {styles} from './Screen';

export default class ChatRoomScreen extends Component {
    render(){
      // <ChatRoomContainer/>
        return (
            <View style={styles.screen}>
              <Text>Chat Room</Text>
            </View>
        );
    }
}

