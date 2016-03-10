'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

import Button from 'react-native-button';

export default class Contact extends Component {
  // define PropTypes
  
  render(){
    return (
      <View style={styles[this.props.type]}>     
        <Text>{ this.props.name }</Text>
        <Button onPress={Actions.enterRoom(this.props.id)} />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contact: {
    textAlign: 'left',
    color: '#666',
    margin: 5,
  },
  provider: {
    color: 'blue',
  },
  client: {
    color: 'green',
  }
});



