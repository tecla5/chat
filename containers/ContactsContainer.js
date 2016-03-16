import React, {
  View,
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';

import { contacts } from '../fake';

export default class ContactsContainer extends FirebaseContainer {
  constructor(props){
    super(props);
  }

  // Sync with firebase: user-1/contacts            
  get endpoint() {
    return [this.props.userId || 'user-1', 'contacts'].join('/')    
  }          
                    
  componentWillMount(){
    super.componentWillMount();      
    // fake contacts
    this.setState({
        contacts: this.state.contacts.concat(contacts)
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

import { useCommon } from '../styles';
const styles = useCommon('container');
