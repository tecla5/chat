'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
    render(){
        return (
            <View style={styles.container}>
              <View style={styles.socialAuth}>
                  <Button onPress={() => this._socialAuth('facebook')}>Facebook</Button>
                  <Button onPress={() => this._socialAuth('twitter')}>Twitter</Button>
                  <Button onPress={() => this._socialAuth('gmail')}>Gmail</Button>                
              </View>
              <View style={styles.actions}>
                <Button onPress={Actions.pop}>Back</Button>
              </View>
            </View>
        );
    }
    
    _socialAuth(type) {
      try {
        // do the appropriate login
        switch (type) {
          case 'gmail':
            return Actions.loggedIn();
          default:
            Actions.error('Unknown social login type', type);          
        }              
      } catch (err) {
        Actions.error('Login error', err.message);                               
      }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    socialAuth: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',        
        marginBottom: 10
    },
    actions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
