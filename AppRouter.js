'use strict';

import React, {
  Component, 
  Platform,
  StyleSheet,
  Navigator
} from 'react-native';

import RNRF, {
  Route,
  Schema, 
  // Animations, 
  Actions, 
  TabBar
} from 'react-native-router-flux';

import {connect} from 'react-redux';

const Router = connect()(RNRF.Router);

//import LaunchScreen from './screens/LaunchScreen';
import LoginScreen from './screens/LoginScreen';

import ChatRoomScreen from './screens/ChatRoomScreen';
import RoomsScreen from './screens/RoomsScreen';
import ContactsScreen from './screens/ContactsScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import SideDrawer from './components/navigation/SideDrawer';
import Header from './components/navigation/Header';
import TabView from './components/navigation/TabView';  
import GoogleLogout from './components/GoogleLogout';

let googleLogout = new GoogleLogout();

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

export default class AppRouter extends Component {
  render() {
    return (
      <Router hideNavBar={false} name="root" >
      
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />
        <Schema name='boot'  sceneConfig={Navigator.SceneConfigs.FadeAndroid}  hideNavBar={true} type='replace' />          
        <Schema name="tab" type="switch"  />
        <Schema name='main' sceneConfig={Navigator.SceneConfigs.FadeAndroid} hideNavBar={hideNavBar}  />

        <Route name="error" type="modal" component={Error}/>
        
        <Route name="login"       component={LoginScreen}        schema='boot' type="replace" title="Login" hideNavBar={true} />
        <Route name="loggedIn"    component={ChatRoomScreen}     footer={TabView} />

        <Route name="contacts"    component={ContactsScreen}     initial={true} type="replace" title='Contacts' footer={TabView} renderRightButton={googleLogout.signoutButton} />
        <Route name="profile"     component={UserProfileScreen}  title='User profile' footer={TabView} />
        <Route name="rooms"       component={RoomsScreen}        title="Rooms" footer={TabView} />
        <Route name="room"        component={ChatRoomScreen}     title="Chat Room" footer={TabView} />
       
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
    );
  }
}

// Used for to pass the drawer to the all children
AppRouter.childContextTypes = {
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