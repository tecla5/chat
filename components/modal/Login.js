'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

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
      // do the appropriate login      
      Actions.loggedIn();
      Actions.error('Unsuccessful login. Please try login again!');
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
