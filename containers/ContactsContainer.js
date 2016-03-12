import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

import FirebaseAdapter from '../adapters/FirebaseAdapter';

import ContactList from '../components/contact/ContactList';

export default class ContactsContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      loading: true
    };
  }
          
  componentWillMount(){
    /*
    * Here we call 'bindToState', which will update
    * our local 'messages' state whenever our 'chats'
    * Firebase endpoint changes.
    */
    this.adapter = new FirebaseAdapter({endpoint: 'contacts'});    

    // will sync messages on state
    this.adapter.syncState({onSuccess: this._onSync, ctx: this});
  }

  _onSync(){  
    this.state.loading = false; // hides load indicator!
  }

  // TODO: loading indicator    
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
