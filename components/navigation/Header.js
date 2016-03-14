'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import {titleCase} from '../../utils';

const TabButton = (props, state) => {
  console.log('header btn', props);
  let label = titleCase(props.label || props.action);
  return <Button style={styles.tab} onPress={Actions[props.action]}>{label}</Button>
}

export default class Header extends Component {
    render(){      
        return (
            <View style={styles.container}>
              <Text/>
              <Text>Chat</Text>
              <TabButton action='drawer' label='=' />              
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    tab: {
      flex: 1,      
      margin: 10,
      textAlign: 'center',
      color: 'white'      
    }
});
