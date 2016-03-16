'use strict';

import React, {
  Component,
  Text,
  View,
  ListView
} from 'react-native';

import Contact from './Contact';
import List from '../base/List';

import { contacts } from '../../fake'; 
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
    console.log('contacts', contacts)
    this.state = {
      contacts: this._dataSource().cloneWithRows(this.props.contacts || contacts)
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
    console.log('single contact', contact)
    return <Contact {...contact}/>;
  }  
}

import { useCommon } from '../../styles';
const styles = useCommon('list');
