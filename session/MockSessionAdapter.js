import SessionAdapter from './SessionAdapter';
import { users } from '../fake';

export default class MockSessionAdapter extends SessionAdapter {
    constructor(options = {}) {      
      // perhaps enable/disable debug logging?      
    }

    // more generic way for doing:
    // (options.logoutCb && options.logoutCb(user)) || console.log('logoutCb cb missing', user); 
    _invokeCb(options, cbName, ...args) {
      let cbFun = options[cbName];
      (cbFun && cbFun(...args)) || console.log(cbName, ' callback missing', ...args);  
    }
    
    mockUser() {
      return users[0];
    }

    currentUser() {
      return this.mockUser();
    }

    // simulate server comm. via nested timeouts
    signIn(options = {}) {
      setTimeout(() => {
          this._invokeCb(options, 'authCb', this.mockUser());
          
          setTimeout(() => {
            this._invokeCb(options, 'createCb', user);
          }, 1000); 
                                      
        }, 500);
    }
    
    getUser(options = {}) {
      // user { email name id photo scopes[plus, userInfo]}
      setTimeout(() => {
        this._invokeCb(options, 'setUser', this.mockUser());        
      }, 1000);      
    }
            
    signOut(options = {}) {
      setTimeout(() => {
        this._invokeCb(options, 'logoutCb', this.mockUser());         
      }, 500);
    }  
} 
