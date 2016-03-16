'use strict';

import React, {
  Component,
  View, 
  // Text, 
  StyleSheet
} from 'react-native';

import RoomsContainer from '../containers/RoomsContainer';
import Screen from './Screen';

export default class RoomsScreen extends Screen {
  render(){
    return (
      <View style={styles.screen}>
        <RoomsContainer />
      </View>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
