'use strict';

import NavigationBar from 'react-native-navbar';

import React, {
  Component, 
  StyleSheet,
  View
} from 'react-native';

import {Actions} from 'react-native-router-flux';

// This NavBar can be used for header property in a Router to draw the header/Navbar at the top!
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

const styles = StyleSheet.create({
  navBar: {
      backgroundColor: '#0db0d9'
  }
});
