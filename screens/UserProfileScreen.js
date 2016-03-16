'use strict';

import React, {
  Component,
  View 
} from 'react-native';

// TODO: wrap with Container?
import UserProfile from '../components/user/UserProfile';
import Screen from './Screen';

export default class UserProfileScreen extends Screen {      
  constructor(props){
    super(props);    
  }
 
  // TODO: use Container
  render(){
    return (
      <View style={styles.screen}>
        <UserProfile {...this.props} />        
      </View>
    );
  }
}

import { merge, common } from '../styles';

let styles = merge({
    screen: common.screen
  },    
  // custom overrides
  // {}
); 
