'use strict';

import React, {
  Component,
  View 
} from 'react-native';

import ChatRoomContainer from '../containers/ChatRoomContainer';
import Screen from './Screen';

export default class ChatRoomScreen extends Screen {
  render(){ 
    return (
      <ChatRoomContainer/>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
