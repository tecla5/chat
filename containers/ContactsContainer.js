import React, {
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';

export default class ContactsContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    // TODO: should be: [userId]/contacts 
    this._endpoint = 'contacts';
  }

  initialState() {
    return {
      contacts: []
    }
  }  
          
  // TODO: loading indicator    
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
    backgroundColor: '#F5FCFF',
  }
});
