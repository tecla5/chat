
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';
import Rebase from 're-base';


var base = Rebase.createClass('https://t5-chat.firebaseio.com/');
console.log('Please change to your own firebase address in components/NewChat.js');


class NewChat extends React.Component {
    
  _newChat(event){

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

    base.post('chats', {
      data: this.props.chats.concat([{
        message: event.target.value
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

    // clear input
    event.target.value = '';

  }
  render(){
    return (
      <View style={styles.chatForm}>
          <TextInput ref='title' placeholder='Title' style={styles.chatInput} />                    
      </View>
    );
  }
}
/*
          <Button onPress={this._newChat.bind(this) } />

      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this._handlePress}>
        Press Me!
      </Button>
*/


const styles = StyleSheet.create({
  chatForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chatInput: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderColor: 'blue'
    //borderBottom: 2
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default NewChat;
