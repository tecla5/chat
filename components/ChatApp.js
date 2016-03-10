'use strict';

import React from 'react-native';

const {
  AppRegistry,
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
    switch (action.type) {
        case Actions.BEFORE_ROUTE:
            //console.log("BEFORE_ROUTE:", action);
            return state;
        case Actions.AFTER_ROUTE:
            //console.log("AFTER_ROUTE:", action);
            return state;
        case Actions.AFTER_POP:
            //console.log("AFTER_POP:", action);
            return state;
        case Actions.BEFORE_POP:
            //console.log("BEFORE_POP:", action);
            return state;
        case Actions.AFTER_DISMISS:
            //console.log("AFTER_DISMISS:", action);
            return state;
        case Actions.BEFORE_DISMISS:
            //console.log("BEFORE_DISMISS:", action);
            return state;
        default:
            return state;
    }
}

let store = createStore(reducer);
const Router = connect()(RNRF.Router);

const TabIcon = (props, state) => {
    return (
        <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
}

// import Register from './modal/Register';
// import Login from './modal/Login';
// import Error from './modal/Error';

import Launch from './Launch';

// import ChatRoomContainer from '../containers/ChatRoomContainer';
// import ContactsContainer from '../containers/ContactsContainer';

const Header = (props, state) => {
  return <Text>Header</Text>;
}

/*
Three kinds of Route animations defined as schemas:
  - modal (floats up from button)
  - default (floats in from right)
  - tab (switches directly) 

Routes to the following components:
  - loggedIn: ChatRoomContainer (default screen shown after login)
  - login: Login
  - error: Error
  - room: ChatRoomContainer
  - contacts: ContactsContainer

Also displays a Tabbar in the footer of the screen
  - room: ChatRoomContainer
  - contacts: ContactsContainer
  
TODO: How do we avoid Route duplication? 

To go to a route, use Actions.[route name] such as Actions.login() or Actions.contacts() 
*/

export default class ChatApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true} name="root">
                    <Route name="launch" header={Header} initial={true} component={Launch} wrapRouter={true} title="Launch" hideNavBar={true}/>
                </Router>
            </Provider>
        );
    }
}

                    // <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    // <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    // <Schema name="tab" type="switch" icon={TabIcon} />

                    // <Route name="loggedIn" component={ChatRoomContainer}/>
                    
                    // <Route name="login" schema="modal" component={Login}/>
                    // <Route name="error" type="modal" component={Error}/>
                    // <Route name="room" component={ChatRoomContainer}/>
                    // <Route name="contacts" component={ContactsContainer}/>

                    // <Route name="tabbar">
                    //     <Router footer={TabBar}>
                    //         <Route name="room" schema="tab" title="Tab #3" component={ChatRoomContainer}/>
                    //         <Route name="contacts" schema="tab" title="Tab #4" component={ContactsContainer} />
                    //     </Router>
                    // </Route>

