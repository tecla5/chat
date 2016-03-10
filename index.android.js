'use strict';

import React, {
<<<<<<< HEAD
  AppRegistry
} from 'react-native';

import ChatApp from './components/ChatApp';

AppRegistry.registerComponent('chat', () => ChatApp);
=======
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
>>>>>>> f3cd5433c0e1323674520576c571f89d70b58b9b
