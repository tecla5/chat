import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';


export default class ContactsContainer extends FirebaseContainer {

  constructor(props){
    super(props);
    this.state = {
        user: this.props.user
    };        
  }

  // Sync with firebase: user-1/contacts            
  get endpoint() {
    return [this.props.user.id || 'user-1', 'contacts'].join('/')    
  }
                    
      
  render() {
    return (
      <View style={styles.container}>
        <Text>Providers</Text>
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
    // backgroundColor: 'green',
  }
});
