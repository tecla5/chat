'use strict';

var React = require('react-native');
var {
  Text,
  Navigator,
  Platform,
  StyleSheet
} = React;

function titleCase(text) {
    console.log('title', text); 
    return text.replace(/\b\w+\b/g, function(word) { 
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); 
    }); 
}

var Navigation = React.createClass({    
  getInitialState() {
    return {
      route: 'conversations'
    };
  },

  render() {
    return (
      <Navigator
        initialRoute={{id: this.state.route, title: 'Gifted Messenger'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 56 : 64)}}
        
        navigationBar={this._renderNavBar()}
      />
    );
  },
  
  _handleBack() {
    this.navigator.pop();
  },
  
  _renderNavBar() {
    var _self = this;    
    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        return <Text style={styles.toolbarButton} onPress={this._handleBack}>Back</Text>;
      },
      RightButton(route, navigator, index, navState) {
        return <Text style={styles.toolbarButton}>=</Text>;
      },
      Title(route, navigator, index, navState) {
        return <Text style={styles.toolbarTitle}>{titleCase(_self.state.route)}</Text>;
      }
    };
    return (
      <Navigator.NavigationBar
        style={styles.toolbar}
        routeMapper={routeMapper}
      />
    );
  },
  
  // https://facebook.github.io/react-native/docs/navigator.html
  
  renderScene(route, navigator) {
    var GiftedMessengerExample = require('./GiftedMessengerExample');
    var Conversations = require('./Conversations');
    // this.setState({route: route});
    console.log(navigator.getCurrentRoutes());
    switch (route.id) {
        case 'chat':
            return (
            <GiftedMessengerExample />
            );
            break;
    
        case 'conversations':
            return (
            <Conversations navigator={navigator} />
            );
            break;
            
        default:
            return (
            <Text>Error</Text>            
            );
            break;
    }

  },
});

const styles = StyleSheet.create({
    toolbar:{
        backgroundColor: '#007aff',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        justifyContent: 'center',        
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    },
    title: {
      fontWeight: 'bold'
    }
});

module.exports = Navigation;