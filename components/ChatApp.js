'use strict';

var React = require('react-native');
var {
  AppRegistry, 
  Navigator, 
  StyleSheet,
  Text,
  View
} = React;

var RNRF = require('react-native-router-flux');

var {
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

import Register from './modal/Register';
import Login from './modal/Login';
import Error from './modal/Error';

import Launch from './Launch';

import ChatRoomContainer from '../containers/ChatRoomContainer';
import ContactsContainer from '../containers/ContactsContainer';

const Header = (props, state) => {
  return <Text>Header</Text>;
}

export default class ChatApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true} name="root">
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="tab" type="switch" icon={TabIcon} />

                    <Route name="register" component={Register} title="Register"/>
                    <Route name="login" schema="modal" component={Login}/>
                    <Route name="error" type="modal" component={Error}/>

                    <Route name="tabbar">
                        <Router footer={TabBar}>
                            <Route name="rooms" schema="tab" title="Tab #3" component={ChatRoomContainer}/>
                            <Route name="contacts" schema="tab" title="Tab #4" component={ContactsContainer} />
                        </Router>
                    </Route>
                    <Route name="launch" header={Header} initial={true} component={Launch} wrapRouter={true} title="Launch" hideNavBar={true}/>
                </Router>
            </Provider>
        );
    }
}
