/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


import React, {
  AppRegistry,
  Component
} from 'react-native';

import T5Chat from './components/T5Chat';

class chat extends Component {    

  render() {
    return (
        <T5Chat />      
    );
  }
}


AppRegistry.registerComponent('chat', () => chat);
