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

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Rebase from 're-base';
let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class GoogleLogout extends Component {
    
    signoutButton(){        
      return (
        <View style={styles.rightButton}>
            <TouchableOpacity onPress={() => {
                    console.log('signout');       
                    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
                        Actions.login(); 
                    })
                    .done();
                }}>
                <Text>Logout</Text>
            </TouchableOpacity>                    
        </View>          
      );    
    }   
    
   
    _signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});        
            // Actions.login(); 
        })
        .done();
    }
        
    render() {
        const user = GoogleSignin.currentUser();
        //console.log('render user: ', user);

            return (
                <View style={styles.container} >
                    <Image
                        style={styles.icon}
                        source={{uri: this.state.user.photo}}   />      
                    <Text>{this.state.user.name} Logged</Text>
                    <TouchableOpacity onPress={() => {this._signOut(); }}>
                        <View style={{marginTop: 50}}>
                        <Text>Log out</Text>
                        </View>
                    </TouchableOpacity>                    
                </View>                
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
