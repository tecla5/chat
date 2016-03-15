'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import RoomsContainer from '../containers/RoomsContainer';
import {styles} from './Screen';

export default class RoomsScreen extends Component {
    render(){
      // <RoomsContainer/>
        return (
            <View style={styles.screen}>
              <RoomsContainer />
            </View>
        );
    }
}

