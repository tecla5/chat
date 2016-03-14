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
        return (
            <View style={styles.container}>
                <Text>Tab {this.props.title}</Text>
                {this.props.name === "contacts" &&
                <Button onPress={Actions.rooms}>Rooms</Button>
                }
                {this.props.name === "rooms" &&
                <Button onPress={Actions.room}>Contacts</Button>
                }
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
