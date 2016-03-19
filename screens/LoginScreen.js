'use strict';

import React, {
  Component,
  View
} from 'react-native';

import GoogleLogin from '../components/session/GoogleLogin';
import Screen from './Screen';

export default class LoginScreen extends Screen {
  render(){
    return (
      <View style={styles.screen}>
          <GoogleLogin/>
      </View>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
