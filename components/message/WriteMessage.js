'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from 'react-native-button';

import Rebase from 're-base';
const base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class WriteMessage extends Component {

  constructor(props){
    super(props);
    console.log('create:WriteMessage', props);
    this.state = {
      message: ''
    }
  }
    
  _newMsg(event) {
    console.log('_newMsg props', this.props);
    /*
     * Here, we call .post on the '/chats' ref
     * of our Firebase.  This will do a one-time 'set' on
     * that ref, replacing it with the data prop in the
     * options object.
     *
     * Keeping with the immutable data paradigm in React,
     * you should never mutate, but only replace,
     * the data in your Firebase (ie, use concat
     * to return a mutated copy of your state)
    */

    base.post('messages', {
      // adds message to list of messages
      data: this.props.messages.concat([{
        message: this.state.message
      }]),
      context: this,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: () => {
        console.log('POSTED');
      }
    });
  }
  
    
  render(){
    return (
      <View style={styles.chatForm}>
        <TextInput
            style={styles.chatInput}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            placeholder="Type a message"
        />        
        <Button
            onPress={this._newMsg.bind(this)}
            style={styles.chatBtn}
        >
            Press Me To Chat!
        </Button>          
      </View>
    );
  }   
}

const styles = StyleSheet.create({
  chatForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chatBtn: {
    
  }
  // chatInput: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  //   borderWidth: 2,
  //   borderColor: 'blue'
  // }
});
