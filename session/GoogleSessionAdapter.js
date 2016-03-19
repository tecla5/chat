import SessionAdapter from './SessionAdapter';

import {GoogleSignin} from 'react-native-google-signin';

export default class GoogleSessionAdapter extends SessionAdapter {
    constructor(GoogleAPIoptions) {      
      GoogleSignin.configure(GoogleAPIoptions);      
    }

    // more generic way for doing:
    // (options.logoutCb && options.logoutCb(user)) || console.log('logoutCb cb missing', user); 
    _invokeCb(options, cbName, ...args) {
      let cbFun = options[cbName];
      (cbFun && cbFun(...args)) || console.log(cbName, ' callback missing', ...args);  
    }
    
    currentUser() {
      return GoogleSignin.currentUser()
    }

    signIn(options = {}) {
        GoogleSignin.signIn()
        .then((user) => {
          this._invokeCb(options, 'authCb', user);                            
        })
        .then(() => {
          this._invokeCb(options, 'createCb', user);
        }) 
        .catch((err) => {          
          (options.onError && options.onError(err)) || console.error(err);            
        })
        .done();      
    }
    
    getUser(options = {}) {
      // user { email name id photo scopes[plus, userInfo]}
      GoogleSignin.currentUserAsync().then((user) => {
        this._invokeCb(options, 'setUser', user);        
      }).done();      
    }
            
    signOut(options = {}) {
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this._invokeCb(options, 'logoutCb', user);         
      })
      .done();
    }  
} 
