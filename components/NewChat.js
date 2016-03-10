
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var Button = require('react-native-button');

import Rebase from 're-base';



var base = Rebase.createClass('https://t5-chat.firebaseio.com/');


class NewChat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      message: ''
    }
  }
    
  _newChat(event){
    console.log('Pressed!');
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
        //title: 'hola', //this.refs.title.getDOMNode().value ,
        message: this.state.message //event.target.value
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
        />        
        <Button
            onPress={this._newChat.bind(this)}
            style={styles.chatInput}
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
