'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';
import Launch from '../components/Launch';
import {styles} from './Screen';


export default class LaunchScreen extends Component {
    render(){
        return (
            <Launch/>
        );
    }
}
