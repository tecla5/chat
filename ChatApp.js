'use strict';

import React, {
  Platform,
  Component, 
  Navigator, 
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'react-native-button';

import RNRF, {
  Route,
  Schema, 
  // Animations, 
  Actions, 
  TabBar
} from 'react-native-router-flux';

// Redux stuff is optional
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function reducer(state = {}, action) {
  // console.log('action', action);  
  return state;
}

let store = createStore(reducer);
const Router = connect()(RNRF.Router);

/*const TabIcon = (props, state) => {
    return (
        <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
}*/

import codePush from 'react-native-code-push';




// main pages: container sets state from Firebase to display on page (contacts, messages)

import LoginScreen from './screens/LoginScreen';
import LaunchScreen from './screens/LaunchScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import RoomsScreen from './screens/RoomsScreen';
import ContactsScreen from './screens/ContactsScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import SideDrawer from './components/navigation/SideDrawer';
import Header from './components/navigation/Header';
import TabView from './components/navigation/TabView';  



/*
Three kinds of Route animations defined as schemas:
  - modal (floats up from bottom)
  - default (floats in from right)
  - tab (switches directly) 

Routes to the following components:
  - loggedIn: ChatRoomContainer (default screen shown after login)
  - login: Login
  - error: Error
  - room: ChatRoomContainer
  - contacts: ContactsContainer
  
To go to login page, simply execute: Actions.login(); and so on for each route/action  

Also displays a Tabbar in the footer of the screen
  - room: ChatRoomContainer
  - contacts: ContactsContainer
  
TODO: How do we avoid Route duplication? 

To go to a route, use Actions.[route name] such as Actions.login() or Actions.contacts() 
*/

// For more on Router and Navbar, see: 
// - https://github.com/aksonov/react-native-router-flux
// - https://github.com/exponentjs/ex-navigator
// - https://github.com/react-native-fellowship/react-native-navbar

// We can use a Side drawer using this example: https://github.com/efkan/rndrawer-implemented-rnrouter

const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? 0 : 8

export default class ChatApp extends Component {
  render() {
    // TODO: add header={Header} to initial route: launch
    // const { drawer } = this.state;    
          // icon={TabIcon}
          // wrapRouter={true} hideNavBar={false} title="Home" rightTitle="menu" onRight={() => {Actions.drawer() }}
       
    return (
      <Provider store={store}>
        <Router hideNavBar={false} name="root" footer={TabView}>
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          
          <Schema name="tab" type="switch"  />
          <Schema
            name='main'
            sceneConfig={Navigator.SceneConfigs.FadeAndroid}
            hideNavBar={hideNavBar}
          />

          <Route name="error" type="modal" component={Error}/>
          
          
          <Route name="launch"       component={LaunchScreen}      title="Launch" initial={true} hideNavBar={true} />

          <Route name="login"       component={LoginScreen}        title="Login"  schema="modal" />
          <Route name="loggedIn"    component={ChatRoomScreen}     />

          <Route name="profile"     component={UserProfileScreen}  title='User profile' />
          <Route name="contacts"    component={ContactsScreen}     title='Contacts' />
          <Route name="rooms"       component={RoomsScreen}        title="Rooms" />
          <Route name="room"        component={ContactsScreen}     title="Chat Room" />

          

          <Route name='drawer' hideNavBar={true} type='reset'>
            <SideDrawer>
              <Router
                sceneStyle={styles.routerScene}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navTitle}
              >
                <Route name="profile" component={UserProfileScreen} schema='main' title='User Profile'/>
                <Route name='room' component={ChatRoomScreen} schema='main' title='Room' />
                <Route name='rooms' component={RoomsScreen} schema='main' title='Rooms' />
                <Route name='contacts' component={ContactsScreen} schema='main' title='Contacts' />
              </Router>
            </SideDrawer>
          </Route>

        </Router>
      </Provider>
    );
  }
}

// Used for to pass the drawer to the all children
ChatApp.childContextTypes = {
  drawer: React.PropTypes.object,
};

const styles = StyleSheet.create({
	navBar: {
		flex: 1,
		flexDirection: 'row',
    height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue',
	},
	navTitle: {
		color: 'white',
	},
	routerScene: {
		paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
	}
});

