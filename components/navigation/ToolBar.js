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

// From: http://moduscreate.com/react-native-layout-system/
export default class ToolBar extends Component{
    render() {
        return (
          <View>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}>Add</Text>
                    <Text style={styles.toolbarTitle}>This is the title</Text>
                    <Text style={styles.toolbarButton}>Like</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width: 50,
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    }
});