# chat

### User Presence

Based on [Presence system: Users online](https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html) article.

"Imagine you have some exciting news you really want to share with a friend. You jump on your favorite social network, open the friends list, and quickly scan for your friend’s name. There’s a red dot next to it indicating that she’s busy - no matter - this is important! You double click to open a chat window…"

`onDisconnect` - function that tells the Firebase server to do something when it notices a client isn’t connected anymore.

This is exactly what we want - we need to instruct the Firebase server to set the user’s presence to `false` when it detects that the client went offline.

Implementation can be found in `data/Presence.js`

```js
  /users
    /jadams (userId: unique username)
      /presence
        /online (true|false)      
        /lastDisconnect (timestamp)
        /status
        /history
```

## Data model

We will use this [basic chat structure](https://docs-examples.firebaseio.com/web/data) as a foundation (keep a flat structure). 

```js
{
      // rooms contains only meta info about each room
      // stored under the room's unique ID
      "rooms": {
        "one": {
          "name": "room alpha",
          "type": "private"
        },
        "two": { ... },
        "three": { ... }
      },

      // room members are easily accessible (or restricted)
      // we also store these by room ID
      "members": {
        // we'll talk about indices like this below
        "one": {
          "mchen": true,
          "hmadi": true
        },
        "two": { ... },
        "three": { ... }
      },

      // messages are separate from data we may want to iterate quickly
      // but still easily paginated and queried, and organized by room ID
      "messages": {
        "one": {
          "m1": { 
            "sender": "mchen", 
            "message": "foo" 
          },
          "m2": { ... },
          "m3": { ... }
        },
        "two": { ... },
        "three": { ... }
      }
    }
```

### Model extras

We will combine the simple model above with some elements from [Firechat datamodel](https://firechat.firebaseapp.com/docs/#data_structure)

Message attributes:

```js
message-id
  userId - The id of the user that sent the message.
  name - The name of the user that sent the message.
  content - The content of the message.
  timestamp - The time at which the message was sent.
```

### Creating/Entering rooms

From the `members` collection, we can see which users are members of each room. 
When a user who wishes to initiate a conversation with one or more users, we first check if we 
have an existing room with that calibration (ie. set of users). If so, we reuse that room.
Otherwise we create a new room, where we ensure that each room gets a unique key.

[Push IDs](https://www.firebase.com/blog/2015-02-11-firebase-unique-identifiers.html)

*Guaranteed Chronological Ordering*

To get guaranteed chronological ordering, you probably shouldn’t rely on push IDs but instead use our ServerValue.TIMESTAMP feature, which looks like this:

```js
// Write some data with a timestamp
ref.push({
    foo: 'bar',
    date: Firebase.ServerValue.TIMESTAMP
});

// Later, retrieve the data by ordered date
ref.orderByChild('date').on('child_added', function(snapshot) {
    //Do something with ordered children
});
```

*Using Push to Create Unique IDs*

Firebase’s solution to the problem of unique identification is the push method (note that this is named childByAutoId in iOS).
Like JavaScript’s push method, this appends new records to the end of our collection. It does this by assigning a permanent, unique id based on the current timestamp (offset to match server time). 
This means that each record is naturally sorted at the end and that they *maintain a chronological order*

[Firebase best practices - arrays](https://www.firebase.com/blog/2014-04-28-best-practices-arrays-in-firebase.html)

```js
var newRoomRef = membersRef.push();
// we can get its id using key()
console.log('Room id:', newRoomRef.key());
// now it is appended at the end of data at the server
newChildRef.set({foo: 'bar'});
```

We could also have used [Set with priority](https://www.firebase.com/docs/web/api/firebase/setwithpriority.html) to ensure that 
messages are set/sorted in a specific order on the server, but since Push Ids are based on timestamps we get
chronological order for free :)

[Ordered data](https://www.firebase.com/docs/web/guide/retrieving-data.html#section-ordered-data)

To build the message, we simply set with a value like this, using a server side Timestamp:

```js
let newMessage = {
  userId: .. ,
  userName: .. ,
  content: .. ,
  timestamp: Firebase.ServerValue.TIMESTAMP
}
```

Then we can get the 10 latest messages:

```js
// retrieve the last 10 messages
roomRef.limitToLast(10).once('value', function(snap) {
   snap.forEach(function(userSnap) {
      console.log('message: ', snap.val());
   });
});
```

### Firebase containers

In React, Container componets are used to setup the data that is then passed down to view components.
For such data containers, we can extend the `FirebaseContainer`, which will sync a given array (collection) from Firebase with 
the react state, which can then be sent down to view components in the props (co they are stateless and only the container maintains state).

The `FirebaseContainer` uses a `FirebaseAdapter` which can be found in `/adapters`. For testing, a `MockAdapter` can be used.

By convention, the `FirebaseContainer` expects an `_endpoint` to be configure in the constructor. A function `initialState` must be defined
to represent the initial state, including the array to sync. Then the render must pass the state to the main view component as props
as in: `<ContactList {...this.state} />`. A boolean `loading` will be passed along automatically! 

```js
export default class ContactsContainer extends FirebaseContainer {
  constructor(props){
    super(props);
    // TODO: should be: [userId]/contacts 
    this._endpoint = [props.userId, 'contacts'].join('/');
  }

  // or leave out if this is all your state, as this will be the 
  // state returned by the initialState() inherited from FirebaseContainer  
  initialState() {
    return {
      contacts: []
    }
  }  
          
  // TODO: loading indicator    
  render() {
    return (
      <View style={styles.container}>
        <ContactList {...this.state} />
      </View>      
    );
  }
}
```