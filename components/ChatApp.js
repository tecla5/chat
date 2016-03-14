'use strict';

import React from 'react-native';

const {
  Component, 
  Navigator, 
  StyleSheet,
  Text,
  View
} = React;

import RNRF from 'react-native-router-flux';

const {
  Route, 
  Schema, 
  Animations, 
  Actions, 
  TabBar
} = RNRF;

// Redux stuff is optional
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function reducer(state = {}, action) {
  console.log('action', action);  
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


export default class ChatApp extends Component {
  componentDidMount(params) {
      console.log('componentDidMount ', params);
      codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.INMEDIATE
      }, function (status) {
          console.log('codepush ', status);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true} name="root">
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Schema name="tab" type="switch" icon={TabIcon} />

          <Route name="launch" initial={true} component={Launch} wrapRouter={true} hideNavBar={true}/>
          <Route name="loggedIn" component={ChatRoomContainer}/>
          <Route name="login" schema="modal" component={Login}/>
          <Route name="error" type="modal" component={Error}/>
          <Route name="room" title="Chat Room" component={ChatRoomContainer}/>
          <Route name="contacts" component={ContactsContainer}/>
          <Route name="rooms" title="List Room" component={RoomsContainer} />
        </Router>
      </Provider>
    );
  }
}

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


