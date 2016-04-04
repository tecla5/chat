'use strict';

import React, {
  Component,
  View, 
  // Text, 
  StyleSheet
} from 'react-native';

import RoomsContainer from '../containers/RoomsContainer';
import Screen from './Screen';

import TabView from './../components/navigation/TabView';  


export default class RoomsScreen extends Screen {
  render(){
    return (
      <View style={styles.screen}>
        <RoomsContainer />
        <TabView />
      </View>
    );
  }
}

import { merge, common } from '../styles';

const styles = merge({
    screen: common.screen
  }
); 
