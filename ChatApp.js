'use strict';

import React, {
  Component  
} from 'react-native';

// Redux stuff is optional
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppRouter from './AppRouter';

function reducer(state = {}, action) {  
  return state;
}

let store = createStore(reducer);

// import codePush from 'react-native-code-push';

export default class ChatApp extends Component {
                 
  render() {
    return (        
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}


