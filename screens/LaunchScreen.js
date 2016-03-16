'use strict';

import React, {
  Component,
  View 
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';
import Launch from '../components/Launch';
import Screen from './Screen';

export default class LaunchScreen extends Screen {
  render(){
    return (
      <Launch/>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
