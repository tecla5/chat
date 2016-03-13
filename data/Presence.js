// Used to determine presence of users (online, offline status)
// see: https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html

// https://www.firebase.com/docs/web/guide/offline-capabilities.html
/*

  /users
    /jadams (userId)
      /presence
        /online (true|false)      
        /lastDisconnect (timestamp)
        /status
        /history
*/

function endPointCreator(url, basePath) {
  return function(path, defaultPath) {
    let endpoint = [basePath, path || defaultPath].join('/');
    return new Firebase(url, endpoint); 
  }
}

class UserPresence {
  constructor(options = {}) {
    this.amOnline = new Firebase(options.url, '.info/connected');

    const presencePath = [options.userId, options.precense || 'presence'].join('/');
    let createEndpoint = endPointCreator(options.url, presencePath);
      
    // TODO: de-duplicate    
    this.endpoints = {
      online: createEndpoint(presencePath, 'online'),
      lastDisconnect: createEndpoint(presencePath, 'lastDisconnect'),
      status: createEndpoint(presencePath, 'status'),
      history: createEndpoint(presencePath, 'history')
    };
        
    // Last seen at…
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        this.endpoints.lastDisconnect.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        this.endpoints.lastDisconnect.set(true);
      }
    });    

    // obtain the last time a particular user was online:
    this.endpoints.lastDisconnect.on('value', function(snapshot) {
      if (snapshot.val() === true) {
        // User is online, update UI.
      } else {
        // User logged off at snapshot.val() - seconds since epoch.
        this.endpoints.lastDisconnect - new Date().getTime();
      }
    });

    // Idle Status
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        this.endpoints.status.onDisconnect().set('☆ offline');
        this.endpoints.status.set('★ online');
      }
    });

    // user session history    
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        var sessionRef = this.endpoints.history.push();
        sessionRef.child('ended').onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        sessionRef.child('began').set(Firebase.ServerValue.TIMESTAMP);
      }
    });    
  }
  
  onIdle() {
    this.endpoints.status.set('☆ idle');
  }

  onAway() {
    this.endpoints.status.set('☄ away');
  }

  onBack(isIdle, isAway) {
    this.endpoints.status.set('★ online');
  }  
}
