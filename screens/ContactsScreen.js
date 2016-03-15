'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';
import {styles} from './Screen';

export default class ContactsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        };
    }
    
    
    render(){
      // <ContactsContainer/>
        return (
            <View style={styles.screen}>
              <Text>Contacts</Text>
            </View>
        );
    }
}
