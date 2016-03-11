import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

//import Firebase from 'firebase';
import Rebase from 're-base';

import ContactList from '../components/contact/ContactList';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class ContactsContainer extends Component {

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
    //base.bindToState('contacts', {
    base.syncState('contacts', {
      context: this,
      state: 'contacts',
      asArray: true
    });
    
    // fake contacts
    this.setState({
        contacts:  this.state.contacts.concat({
            id: 1,
            name: 'Javier Cabrera',
            email: 'cabrera.javier@gmail.com'
        }    ,
    {
        id: 2,
        name: 'Kristian Mandrup',
        email: 'kmandrup@gmail.com'
    }
        ) //updates Firebase and the local state
    });      
    
    
      console.log('componentWillMount',this.state.contacts);    
    
  }  
  
  componentDidMount(){
    console.log('componentDidMount',this.state.contacts);    
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
  }
});
