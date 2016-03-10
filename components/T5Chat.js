
import React, {
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Button from 'react-native-button';


import codePush from 'react-native-code-push';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//import Firebase from 'firebase';
import Rebase from 're-base';


import Container from './Container';
import NewChat from './NewChat';


let base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class T5Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
            contacts: [],
            messages: []
        };
        
        GoogleSignin.configure({
            //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
            //iosClientId: <FROM DEVELOPPER CONSOLE>, // only for iOS
            webClientId: '500862723918-6h0s6ivdnaof6vugvi1c9p8snr6r7e61.apps.googleusercontent.com', //<FROM DEVELOPPER CONSOLE>, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });        
        
    }

    componentWillMount() {
        console.log('componentWillMount');
        /*
         * Here we call 'bindToState', which will update
         * our local 'messages' state whenever our 'chats'
         * Firebase endpoint changes.
         */
                
        base.bindToState('users', {
            context: this,
            state: 'contacts',
            asArray: true
        });        
        
        base.bindToState('chats', {
            context: this,
            state: 'messages',
            asArray: true
        });

    }
    
    componentDidMount(params) {
        console.log('componentDidMount ', params);
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.INMEDIATE
        }, function (status) {
            console.log('codepush ', status);
        });
        
        GoogleSignin.currentUserAsync().then((user) => {
            console.log('USER', user);
            this.setState({user: user});
        }).done();
    }

    _signIn(){
        console.log('pressed login');
        
        GoogleSignin.signIn()
        .then((user) => {
            console.log(user);
           this.setState({user: user});
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();        
    }
    
    _signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this.setState({user: null});
        })
        .done();
    }
  
    render() {
        const user = GoogleSignin.currentUser();
        console.log('user: ',user);
        console.log('state: ',this.state);
        
        if (!this.state.user) {
            return (
                <GoogleSigninButton
                    style={styles.login}
                    onPress={this._signIn.bind(this)}/>                
            )
            
        } else {            
            return (
                <View style={ styles.container } >
                    <TouchableOpacity onPress={() => {this._signOut(); }} style={styles.logout}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                          
                    <Text>T5 Chat 2</Text>
                    <NewChat chats={ this.state.messages } />
                    < Container />
                </View>            
            )
        }
        
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    login: {
        backgroundColor: '#F5FCFF',
        width: 48, 
        height: 48
    },
    logout: {
        marginTop: 50,
        width: 48, 
        height: 48
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
