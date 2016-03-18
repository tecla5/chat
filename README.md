# Chat

## Troubleshooting

### iOS

If you get a an error that your app can't connect to the development server, try looking in `ios/chat/AppDelegate.m` and check that the IP address
matches the IP of your machine.  

### Android

??

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
      
      // which rooms can a given user see on the Rooms screen!!>!>!>!>!>!>!>!>

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

### Other collections

```js
users
  - userId
    - name
    - email
    - facebookId
    - googleId
    - ...

members
  - roomId
    - username: true
    - username: true

contacts
  - userId
    - username: true
    - username: true

friends
  - userId
    - google
      - email
        - username
        - googleId    
    - facebook
      - email
        - username
        - facebookId    
      ...
```   

## Data- and User flow

### User registration

User performs account login/registration via social login (Facebook, Twitter or Google). 
Many users have the same username/email across all these accounts.

We will ask permission to collect contacts/friends from their account.
These friends/contacts are then stored under `friends/[userId]/[social login type]`.
This save is done via `push`.

The user will be asked to invite one or more friends to the App (at least 1 required?).

We will then look up all the contacts in the `users` collection.

See [Firebase: Retrieving data](https://www.firebase.com/docs/web/guide/retrieving-data.html)

This is done via an [equalTo](https://www.firebase.com/docs/web/api/query/equalto.html) query.

```js
usersRef.orderByChild('email').equalTo(email).on("child_added", function(snapshot) {
}
```

Matching users are added as (active) contacts for the user under `contacts/[userId]`. 

```js
.on("child_added", function(snapshot) {
  contactsRef.child(snapshot.userId).push(snapshot);
}
```

The app then displays the contact screen with all users for `contacts/[userId]` 
where `userID` is the logged in user.

```js
contactsRef.child(userId).orderByChild('email').on("child_added", function(snapshot) {
  // called with snapshot for each match
}
```


Whenever a user is registered, a background job is activated to update contacts in the database.
For each user, their `friends/[userId]` is scanned for a matching friend, and their `contacts/[userId]` updated
on a match, and they are sent an App notification that the given user has signed up.  
  
### Contacts screen - initiate Conversation

When one or more contacts are selected and a Conversation opened, we search the `members` collection for a room with users matching all users.
members collection can iterate rooms via [forEach](https://www.firebase.com/docs/web/api/datasnapshot/foreach.html)
Username check be done (effectively?) using [exists](https://www.firebase.com/docs/web/api/datasnapshot/exists.html)

```js
findRoomWithNames(usernames, cb) {
  var membersRef = new Firebase("https://chat.firebaseio.com/members");
  var matchingNames = {};
  membersRef.once("value", function(snapshot) {
    // The callback function will get called twice, once for "fred" and once for "barney"
    snapshot.forEach(function(room) {
      matchingNames[room.value()] = usernames.map(name => roomRef.child(username).exists());
    });
    cb(matchingNames);
  })
}
```

If no match is found, we create a new room (via push to `members` with usernames).
The initiating user will have the option to name the room
 
```js
createRoom(usernames, roomName, cb) {
  var membersRef = new Firebase("https://chat.firebaseio.com/members");
  roomName = roomName || defaultRoomName(usernames);
  
  var newRoomRef = membersRef.push(roomName)
  newRoomRef.then(() =>
    for (name of usernames) {
      newRoomRef.set(name, true);
    }
    cb(newRoomRef);  
  });
}
```

Then notifications are sent to the other users that they are invited to participate in a conversation (listing who initiated and who have been invited). 
If only one other user is invited, we use the username as room name. Otherwise we generate a reasonable name (how?).

An alternative would be to show all previous conversations with those users (f.ex grouped by location, time, topic) (by default sorted most recent first) and letting the user choose 
to either continue existing conversation or create a new one. 
Conversations management could be included later to allow conversations to be grouped by topic, time or location.
 
### Conversation - find contacts

An alternative to initiating directly with existing contacts, is to open an "empty" conversation and make a "shout out" with a given topic/location.
This invite can either be public (f.ex within certain radius of current/given location) or private (to a group of contacts).
Listeners can then choose to participate in the conversation if interested. 

### Negotiation cards

As part of a Conversation, the users can create *Negotiation cards*. These cards vary by type, and can include:
- Invite
- Vote
- Event

Card examples:
- Food
  - Food vote
  - Pizza (social)
- Item(s)
  - Vehicle
  - ..
- Service  
  - Transport
  - Haircut
  - ...

On a card:
- topic with a `#` tag, such as `#van`
- time, using time format such as `10:30` or `tmrw` etc.
- location using `@` tag, such as `@barcelona`
- price using currency code or tag, such as `$`, `€`, `DKK` or even `euro` or `kr.`
- price range     
- max asked for (invited)
- specific criteria

Examples:

*Invite*

```
"Beach party"
#women #beach #party
age[20-30]
tomorrow @20:00
@barcelonetta @barcoa
max:10
```

*Request a van*

```
"Move a table"
#van 
now
@barcelona @gracia
to: @barcelona @tetuan
rent: $10-15
```

Individuals and clients/companies subscribing to #van in @barcelona can then engage in the conversation.
They can offer one of:
- free
- swap (item or service)
- rent (price)
- buy (price)

The user who created the card will see different offers coming in under each category. F.ex:

```
#van
- #car
- #truck
(current location)
@barcelonetta 
@gracia
(time can offer)
15 mins
30 mins
(rent price)
$12 (green)
$17 (yellow - higher than max range)
```

Note: Will never allow a bid at 100% of max range or higher (such as $30 in this case) 
The bidders will be notified of current best bid accepted by the user and are invited to bid lower. 
On any bid acceptance, bidders have the option to counter bid for a given time selected by the card issuer.

### Listening for data

[on()](https://www.firebase.com/docs/web/api/query/on.html) is used to listen for data changes at a particular location. 
This is the primary way to read data from a Firebase database. 

Your callback will be triggered for the initial data AND again whenever the data changes. 
  
For conversations over 100 messages, we likely want to limit initial data load via limit queries.

The `limitToFirst()` and `limitToLast()` queries are used to set a maximum number of children to be synced for a given callback. If we set a limit of 100, we will initially only receive up to 100 child_added events. If we have fewer than 100 messages stored in our database, a child_added event will fire for each message. However, if we have over 100 messages, we will only receive a child_added event for 100 of those messages. These will be the first 100 ordered messages if we are using `limitToFirst()` or the last 100 ordered messages if we are using `limitToLast()`  
  

  
### Creating/Entering rooms

(improved: see above)

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