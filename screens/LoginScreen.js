'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import GoogleLogin from '../components/GoogleLogin';

import {styles} from './Screen';
// style={[styles.container, this.props.styles.container]}

export default class LoginScreen extends Component {
    render(){
        return (
            <View style={styles.screen}>
                <GoogleLogin/>
            </View>
        );
    }
}
