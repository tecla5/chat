import React, {
  View,
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';

import { users } from '../fake';

export default class UserContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    this.state = users[0];
  }
  
  get type() {
    return 'fetch';
  }

  // Fetch from firebase: users/user-1            
  get endpoint() {
    return ['users', this.props.userId || 'user-1'].join('/')    
  }          
                    
  componentWillMount(){
    super.componentWillMount();      
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

