'use strict';

import React, {
  Component,
  Platform  
} from 'react-native';

import codePush from 'react-native-code-push';

// Redux stuff is optional
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppRouter from './AppRouter';

function reducer(state = {}, action) {  
  return state;
}

console.log('Platform', Platform.OS );

let store = createStore(reducer);

export default class ChatApp extends Component {       
    componentDidMount() {
        console.log('componentDidMount ');
        codePush.sync({
            updateDialog: true,
            //installMode: codePush.InstallMode.INMEDIATE
        }, function (status) {
            console.log('codepush ', status);
        });
    }    
                 
    render() {
        return (        
        <Provider store={store}>
            <AppRouter />
        </Provider>
        );
    }


}


