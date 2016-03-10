'use strict';

import React, {
  AppRegistry
} from 'react-native';

import Chat from './components/Chat';

console.log('Chat', Chat);

AppRegistry.registerComponent('chat', () => Chat);
