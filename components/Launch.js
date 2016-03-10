import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'react-native-button';

export default class Launch extends Component {
        
  componentDidMount(params){
    console.log('launched chat');
  }
      
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
