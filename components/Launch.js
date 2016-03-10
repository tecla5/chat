import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Launch extends Component {              
  render() {
    return (
        <View style={styles.container}>
          <Button style={styles.loginBtn} onPress={Actions.login}>Login</Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginBtn: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
