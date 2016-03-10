'use strict';

const NavigationBar = require('react-native-navbar');
const React = require('react-native');
const {
  Component, 
  StyleSheet,
  View
} = React;
import Actions from 'react-native-router-flux';

export default class NavBar extends Component {
    onPrev(){
        if (this.props.onPrev){
            this.props.onPrev();
            return;
        }
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
            Actions.pop();
        }
    }
    render() {
        return <NavigationBar style={styles.navBar}
                              titleColor='white'
                              buttonsColor='white'
                              statusBar='lightContent'
                              prevTitle={this.props.initial ? " " : null}
                              onPrev={this.props.onPrev || Actions.pop}
                              onNext={this.props.onNext || Actions.pop}
            {...this.props}
            />
    }
}

var styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#0db0d9'
    },
});
