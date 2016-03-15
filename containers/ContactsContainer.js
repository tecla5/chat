import React, {
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';

const fakeContacts = [{
    id: 1,
    name: 'Javier Cabrera',
    email: 'cabrera.javier@gmail.com'
  }, {
    id: 2,
    name: 'Kristian Mandrup',
    email: 'kmandrup@gmail.com'
  }];

export default class ContactsContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    // TODO: should be: [userId]/contacts 
    this._endpoint = [props.userId || 'user-1', 'contacts'].join('/');
  }
                    
  componentWillMount(){
    super.componentWillMount();      
    // fake contacts
    this.setState({
        contacts:  this.state.contacts.concat(fakeContacts)
    });    
  } 
  
  componentDidMount(){    
  }
      
  render() {
    return (
      <View style={styles.container}>
        <ContactList {...this.state} />
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  }
});
