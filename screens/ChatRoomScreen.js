'use strict';

import React, {
  Component,
  View 
} from 'react-native';

import ChatRoomContainer from '../containers/ChatRoomContainer';
import Screen from './Screen';

export default class ChatRoomScreen extends Screen {
    
  constructor(props) {
    super(props);
    this.state = {
        user: props.user,
        contact: props.contact,        
    };
  }
    
  render(){ 
    return (
      <ChatRoomContainer  {...this.state} />
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
