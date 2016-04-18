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


import Rebase from 're-base';
let base = Rebase.createClass('https://t5-chat.firebaseio.com');


export default class ContactList extends List {

    constructor(props) {
        super(props);
        console.log('ContactList props:', props);

        this.state = {
            user: this.props.user,
            providers: [],
            contacts: [],
        };
    }


    componentDidMount() {

        base.fetch('providers', {
            context: this,
            asArray: true,
            then(providers) {
                console.log('willMount ', providers);
                this.setState({
                    providers: providers,  // this.props.contacts.concat(
                    contacts: providers // this.props.contacts.concat(
                });


            }
        });


    }



    render() {
        var contacts = this._dataSource().cloneWithRows(this.state.providers); // this.props.contacts.concat(
        return (
            <View style={ styles.list } >
            <ListView dataSource={ contacts } renderRow = { this._renderContact.bind(this) } />
            </View>      
        );
    }

    _renderContact(contact) {
        var x = { contact: contact, user: this.state.user };
        return <Contact {...x } />; // : contact, user: this.state.user
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
