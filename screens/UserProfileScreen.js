'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

// import UserProfile from '../containers/UserProfileContainer';

import {styles} from './Screen';

export default class UserProfileScreen extends Component {
    render(){
      // <UserProfileContainer/>
        return (
            <View style={styles.screen}>
              <Text>User Profile</Text>
            </View>
        );
    }
}
