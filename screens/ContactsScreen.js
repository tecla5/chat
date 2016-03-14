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
    render(){
      // <ContactsContainer/>
        return (
            <View style={styles.screen}>
              <Text>Contacts</Text>
            </View>
        );
    }
}
