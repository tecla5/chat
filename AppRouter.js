'use strict';

import React, {
  Component, 
  Platform,
  StyleSheet,
  Navigator
} from 'react-native';


import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux';

import {connect} from 'react-redux';

//const Router = connect()(RNRF.Router);

//import LaunchScreen from './screens/LaunchScreen';
import LoginScreen from './screens/LoginScreen';

import ChatRoomScreen from './screens/ChatRoomScreen';
import RoomsScreen from './screens/RoomsScreen';
import ContactsScreen from './screens/ContactsScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import SideDrawer from './components/navigation/SideDrawer';
import Header from './components/navigation/Header';
import GoogleLogout from './components/GoogleLogout';

//import TabView from './components/navigation/TabView';  

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

console.log(Platform.OS);

const isAndroid = Platform.OS === 'android'
const paddingTop = isAndroid ? 0 : 8

const isIos = Platform.OS === 'ios'
// TODO: remove when login is working on ios


class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class AppRouter extends Component {
    
  render() {
      /*
                    <Scene key="register" component={Register} title="Register"/>
                    hideNavBar={true}     
                    schema="modal"
      */
      
    return (
        <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}} >
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true} >
                    
                    <Scene key="login"  component={LoginScreen}   type="replace" title="Login" initial={isAndroid} />
                    
                    <Scene key="tabbar" tabs={true} default="contacts" hideNavBar={false} >
                        <Scene key="contacts" direction="vertical" >
                            <Scene key="contactsList"    component={ContactsScreen}     title="Contacts"  />
                            <Scene key="room"    component={ChatRoomScreen}     title="Chat User" />
                        </Scene>
                        <Scene key="rooms" direction="vertical" >
                            <Scene key="roomsList"   component={RoomsScreen}        title="Rooms"  />
                            <Scene key="room"        component={ChatRoomScreen}     title="Chat Room" />
                        </Scene>
                        
                        <Scene key="profile"     component={UserProfileScreen}  title="User profile"  renderRightButton={googleLogout.signoutButton} />
                        
                    </Scene>
                </Scene>  
                <Scene key="error" component={Error}/>
            </Scene>
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