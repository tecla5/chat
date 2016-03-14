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

const TabIcon = (props, state) => {
    return (
        <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
}

import codePush from 'react-native-code-push';

import Login from './components/modal/Login';
import Error from './components/modal/Error';

import Launch from './components/Launch';

// main pages: container sets state from Firebase to display on page (contacts, messages)

import ChatRoomScreen from './screens/ChatRoomScreen';
import RoomsScreen from './screens/RoomsScreen';
import ContactsScreen from './screens/ContactsScreen';
import LoginScreen from './screens/LoginScreen';
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

	constructor (props) {
		super(props);
		this.state = {
			drawer: null,
		};
	}

  componentDidMount(params) {
      codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.INMEDIATE
      }, function (status) {
          console.log('codepush ', status);
      });
  }

  render() {
    // TODO: add header={Header} to initial route: launch
    const { drawer } = this.state;    
       
    return (
      <Provider store={store}>
        <Router hideNavBar={false} name="root" footer={TabView}>
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Schema name="tab" type="switch" icon={TabIcon} />
          <Schema
            name='main'
            sceneConfig={Navigator.SceneConfigs.FadeAndroid}
            hideNavBar={hideNavBar}
          />

          <Route name="launch" initial={true} component={ChatRoomScreen} wrapRouter={true} hideNavBar={false} title="Home" rightTitle="menu" onRight={() => {Actions.drawer() }}/>
          <Route name="loggedIn" component={ChatRoomScreen}/>
          <Route name="login" schema="modal" component={LoginScreen}/>
          <Route name="error" type="modal" component={Error}/>
          <Route name="profile" component={UserProfileScreen} title='User profile'/>
          <Route name="room" title="Chat Room" component={ContactsScreen}/>
          <Route name="contacts" component={ContactsScreen} title='Contacts'/>          
          <Route name="rooms" title="Rooms" component={RoomsScreen} title='Rooms'/>

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

