import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

//import Firebase from 'firebase';
import Rebase from 're-base';

import ContactList from '../components/ContactList';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class ContactList extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: []
    };
  }
          
  componentWillMount(){
    /*
    * Here we call 'bindToState', which will update
    * our local 'messages' state whenever our 'chats'
    * Firebase endpoint changes.
    */
    base.bindToState('contacts', {
      context: this,
      state: 'contacts',
      asArray: true
    });
  }  
    
  render() {
    return (
      <View style={styles.container}>
        <ContactList contacts={ this.state.contacts } />
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
