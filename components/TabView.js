'use strict';

import React, {
  Component,
  View, 
  Text, 
  StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class TabView extends Component {
    render(){
        console.log('route', this.props.name);
      
        return (
            <View style={styles.container}>
              <Button onPress={Actions.room}>Room</Button>
              <Button onPress={Actions.rooms}>Rooms</Button>
              <Button onPress={Actions.contacts}>Contacts</Button>
              <Button onPress={Actions.profile}>User profile</Button>
              <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
