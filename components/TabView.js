'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import {titleCase} from '../utils';

const TabButton = (props, state) => {
  return <Button style={styles.tab} onPress={Actions[props.action]}>{titleCase(props.label || props.action)}</Button>
}

export default class TabView extends Component {
    render(){
        console.log('route', this.props.name);
      
        return (
            <View style={styles.container}>
              <TabButton action='room' />
              <TabButton action='rooms' />
              <TabButton action='contacts' />
              <TabButton action='profile' />              
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    tab: {
      marginLeft: 5,
      marginRight: 5,
      textAlign: 'center'      
    }
});
