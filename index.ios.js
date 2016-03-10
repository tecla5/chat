/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Container from './components/Container';
import NewChat from './components/NewChat';

import codePush from 'react-native-code-push';

//import Firebase from 'firebase';
import Rebase from 're-base';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');//'https://jt-ts.firebaseio.com/rebase-chat'

class chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  }
    
    
  componentDidMount(params){
    console.log('componentDidMount ', params);
    codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.INMEDIATE 
    }, function (status) {
        console.log('codepush ', status);
    });
  }
  
  componentWillMount(){
      console.log('componentWillMount');
  /*
   * Here we call 'bindToState', which will update
   * our local 'messages' state whenever our 'chats'
   * Firebase endpoint changes.
   */
    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    });
    
    console.log(this.state.messages);
    
  }  
    
  render() {
    return (
      <View style={styles.container}>
        <NewChat chats={ this.state.messages } />
        <Container />
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('chat', () => chat);
