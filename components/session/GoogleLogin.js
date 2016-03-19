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

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

// use Users model
import Users from '../../data/Users';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// TODO: load from ENV or config file (in debug mode)
const GoggleAPIoptions = {
    //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    iosClientId: 'com.tecla5.chat', // only for iOS
    webClientId: '500862723918-6h0s6ivdnaof6vugvi1c9p8snr6r7e61.apps.googleusercontent.com', //<FROM DEVELOPPER CONSOLE>, // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
}

export default class GoogleLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        this.sessionAdapter = new GoogleSessionAdapter(GoggleAPIoptions);

        // note: we call with Object to allow for other options if needed in the future
        this.sessionAdapter.signOut({logoutCb: () => {
          Actions.login(); 
        }});                                  
    }
    
    componentDidMount() {        
      this._getUser();
    }

    componentDidUpdate(prevProps) {
    }    
    
    _getUser() {
      this.sessionAdapter.getUser({ setUser: this._setUser });
    }

    _setUser(user) {          
      if(!user || this.state.user) {
        console.log('No user or already set', user, this.state);
        return;
      }
        
      console.log('Set authenticated user', user, this.state);                                 

      this.setState({user: user});
      Actions.contacts(user);        
    }
    
    _signIn(){
      console.log('do signIn');
      // Actions.contacts();
      this.sessionAdapter.signIn({ authCb: this._authenticated, createCb: this._createAuthenticatedUser });        
    }

    // TODO: why not use setUser here!?
    _authenticated(user) {
      console.log('set state with authenticated user', user, this.state);
      if (!this.state.user) {                    
          this.setState({user: user});
      }                                    
    }

    _createAuthenticatedUser(user) {
      console.log('Creating user on server');
      new Users().create(this.state.user, () => {
        console.log('firebase user created');
        //Actions.contacts();
        //Actions.dismiss();
        Actions.contacts();
      })                   
    }

/*
    <TouchableOpacity onPress={() => {this._signOut(); }}>
        <View style={{marginTop: 50}}>
        <Text>Log out</Text>
        </View>
    </TouchableOpacity>                    
*/
        
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
