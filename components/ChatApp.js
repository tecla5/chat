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

import Login from './modal/Login';
import Error from './modal/Error';

import Launch from './Launch';

// main pages: container sets state from Firebase to display on page (contacts, messages)
import ContactsContainer from '../containers/ContactsContainer';
import RoomsContainer from '../containers/RoomsContainer';
import ChatRoomContainer from '../containers/ChatRoomContainer';

import SideDrawer from './SideDrawer';

// import NavBar from './NavBar';
import TabView from './TabView';  

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

// TODO: show name of Room (initial route)
class Header extends Component {
    render(){
        return ( 
        <View style={styles.navBar}>
          <Text style={styles.navTitle}>{this.name}</Text>
          <Button style={styles.navTitle} onPress={Actions.drawer}>=</Button>
       </View>
       );
    }
}

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
    // TODO: add to top level Router
    // footer={TabView}

    const { drawer } = this.state;    
       
    return (
      <Provider store={store}>
        <Router hideNavBar={true} name="root">
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Schema name="tab" type="switch" icon={TabIcon} />
          <Schema
            name='main'
            sceneConfig={Navigator.SceneConfigs.FadeAndroid}
            hideNavBar={hideNavBar}
          />

          <Route name="launch" initial={true} header={Header} component={ChatRoomContainer} wrapRouter={true} hideNavBar={true}/>
          <Route name="loggedIn" component={ChatRoomContainer}/>
          <Route name="login" schema="modal" component={Login}/>
          <Route name="error" type="modal" component={Error}/>
          <Route name="room" title="Chat Room" component={ChatRoomContainer}/>
          <Route name="contacts" component={ContactsContainer}/>
          <Route name="rooms" title="List Room" component={RoomsContainer} />


          <Route name='drawer' hideNavBar={true} type='reset'>
            <SideDrawer>
              <Router
                sceneStyle={styles.routerScene}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navTitle}
              >
                <Route name='room' component={ChatRoomContainer} schema='main' title='Home' />
                <Route name='rooms' component={RoomsContainer} schema='main' title='Screen1' />
                <Route name='contacts' component={ContactsContainer} schema='main' title='Screen2' />
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



// leftTitle="Back" rightTitle="Menu"

// Router
  // header={Header} also known as NavBar
  // footer={Footer}

// <Router footer={TabBar}>

// Optional footer Tab bar

    // <Route name="tabbar">
    //     <Router footer={TabBar}>
    //         <Route name="room" schema="tab" title="Tab #3" component={ChatRoomContainer}/>
    //         <Route name="contacts" schema="tab" title="Tab #4" component={ContactsContainer} />
    //     </Router>
    // </Route>

    // <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

    // <Route name="loggedIn" component={ChatRoomContainer}/>
    
    // <Route name="login" schema="modal" component={Login}/>
    // <Route name="error" type="modal" component={Error}/>
    // <Route name="room" component={ChatRoomContainer}/>
    // <Route name="contacts" component={ContactsContainer}/>


