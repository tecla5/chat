'use strict';

import React, {
  Component,
  Text,
  View,
  ListView
} from 'react-native';

import Contact from './Contact';
import List from '../base/List';

import fake from '../../fake'; 
/*
  Expected data format for each contact:
  Will for now use fake.contacts if none provided by props
  {
    userId: 'kmandrup',
    fullName: 'Kristian Mandrup',
    email: 'kmandrup@gmail.com'
  }
*/
export default class ContactList extends List {

  constructor(props){
    super(props);

    this.state = {
      contacts: this._dataSource().cloneWithRows(this.props.contacts || fake.contacts),
    };    
  }
            
  render() {
    return (
      <View style={styles.list}>
        <ListView dataSource={ this.state.contacts } renderRow={this._renderContact}/>
      </View>      
    );
  }
  
  _renderContact(contact) {
    return <Contact {...contact}/>;
  }  
}

// Demonstrates how we can define and use Global styles that you can be override locally 

import { merge, common } from '../../styles';

const styles = merge({
    list: common.list
  },    
  // custom overrides
  // {}
); 
