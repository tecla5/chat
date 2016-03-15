'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';
import Login from '../components/modal/Login';
import {styles} from './Screen';


export default class LoginScreen extends Component {
    render(){
        return (
            <Login/>
        );
    }
}
