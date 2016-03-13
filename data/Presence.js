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

function refCreator(opts = {}) {
  let _ref = opts.ref || new Firebase(opts.url, opts.path);
  
  return function(path) {
    return ref.child(path || defaultPath); 
  }
}

class UserPresence {
  /*
    new UserPresence({
      url: '<fire base url>',
      userId: 'xyz',
      presence: 'presence' // optional 
    })

    // or directly with a userRef
    new UserPresence({
      userRef: userRef, 
    })
  */
  constructor(options = {}) {
    this.amOnline = new Firebase(options.url, '.info/connected');
    
    let createRef = options.userRef || refCreator(options.url, options.userId);
    presenceRef = createRef.child(options.presence || 'presence');
      
    // TODO: de-duplicate by using Object.keys mapper    
    this.refs = {
      online: createRef(options.online || 'online'),
      lastDisconnect: createRef(options.lastDisconnect || 'lastDisconnect'),
      status: createRef(options.status || 'status'),
      history: createRef(options.history || 'history')
    };
        
    // Last seen at…
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        this.refs.lastDisconnect.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        this.refs.lastDisconnect.set(true);
      }
    });    

    // obtain the last time a particular user was online:
    this.refs.lastDisconnect.on('value', function(snapshot) {
      if (snapshot.val() === true) {
        // User is online, update UI.
      } else {
        // User logged off at snapshot.val() - seconds since epoch.
        this.refs.lastDisconnect - new Date().getTime();
      }
    });

    // Idle Status
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        this.refs.status.onDisconnect().set('☆ offline');
        this.refs.status.set('★ online');
      }
    });

    // user session history    
    amOnline.on('value', function(snapshot) {
      if (snapshot.val()) {
        var sessionRef = this.refs.history.push();
        sessionRef.child('ended').onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        sessionRef.child('began').set(Firebase.ServerValue.TIMESTAMP);
      }
    });    
  }
  
  onIdle() {
    this.refs.status.set('☆ idle');
  }

  onAway() {
    this.refs.status.set('☄ away');
  }

  onBack(isIdle, isAway) {
    this.refs.status.set('★ online');
  }  
}
