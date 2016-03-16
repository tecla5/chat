'use strict';

import React, {
  Component,
  View 
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';
import Screen from './Screen';

export default class ContactsScreen extends Screen {
  constructor(props) {
    super(props);
    this.state = {
        user: props.user,
    };
  }
      
  render(){ 
    return (
      <View style={styles.screen}>
        <ContactsContainer {...this.state} />
      </View>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 

