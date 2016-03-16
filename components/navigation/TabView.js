'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import {titleCase} from '../../utils';

const TabButton = (props, state) => {
  // console.log('tab', props);
  let label = titleCase(props.label || props.action);
  return <Icon.Button name={props.icon} style={styles.tab} onPress={Actions[props.action]}>{label}</Icon.Button>
}

export default class TabView extends Component {
    render(){
        //console.log('route', this.props.name);
      
        return (
            <View style={styles.container}>
              <TabButton action='room'  icon='comment' />
              <TabButton action='rooms' icon='comments' />
              <TabButton action='contacts' icon='users' />
              <TabButton action='profile' icon='user-md' />              
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
//      textAlign: 'center',
//      color: 'white'      
    }
});
