import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

//import Icon from 'react-native-vector-icons/FontAwesome';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

// use Users model
import Users from '../data/Users';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class GoogleLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        
        GoogleSignin.configure({
            //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
            iosClientId: 'com.tecla5.chat', // only for iOS
            webClientId: '500862723918-6h0s6ivdnaof6vugvi1c9p8snr6r7e61.apps.googleusercontent.com', //<FROM DEVELOPPER CONSOLE>, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
               
    }
    
    componentDidMount() {        
        // user { email name id photo scopes[plus, userInfo]}
        GoogleSignin.currentUserAsync().then((user) => {
            console.log('Async USER', user, this.state);
            if(user && !this.state.user) {                    
                this.setState({user: user});
                Actions.tabbar({user: user});
            }
        }).done();
    }
    componentDidUpdate(prevProps) {
    }    
    
    
    _signIn(){
        console.log('do signIn');
        // Actions.contacts();
        
        GoogleSignin.signIn()
        .then((user) => {
            console.log('signIn.then', user, this.state);
            if (user && !this.state.user) {                    
                this.setState({user: user});
                Actions.tabbar({user: this.state.user}); 
            }
                            
        })
        .then( () => {
          new Users().create(this.state.user, () => {
            console.log('firebase user created');
            //Actions.contacts();             
          })            
        } ) 
        .catch((err) => {
            console.log('SIGNIN error', err);            
        })
        .done();        
    }
    
    
    
    render() {
        const user = GoogleSignin.currentUser();
        //console.log('render user: ', user);

        if (this.state.user) {           
            // basic info from user
            return (
                <View style={styles.container} >
                    <Image
                        style={styles.icon}
                        source={{uri: this.state.user.photo}}   />      
                    <Text>{this.state.user.name} Logged</Text>
                </View>                
            )
        }
         
        return (
            <GoogleSigninButton
                style={styles.login}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn.bind(this)}/>                
        )        
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
    icon: {
        width: 40, 
        height: 40,
        marginRight:30,
        //flex: 0.1
    }
  
});
