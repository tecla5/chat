import Model from './Model';

export default class Rooms extends Model {
  constructor(model  = 'rooms', adapter) {
    super(model, adapter);    
  }
  
  defaultRoomName(usernames) {
    return usernames.join('.');
  }
  
  findWithNames(usernames, cb) {
    var membersRef = this.adapter.ref;
    var matchingNames = {};
    membersRef.once('value', function(snapshot) {
      snapshot.forEach(function(room) {
        matchingNames[room.value()] = usernames.map(name => roomRef.child(username).exists());
      });
      cb(matchingNames);
    })
  }
    
  create(usernames = [], roomName, cb) {
    var membersRef = this.adapter.ref;
    roomName = roomName || this.defaultRoomName(usernames);

    // or use then callback?    
    var newRoomRef = adapter.push(roomName);
    newRoomRef.then(() => {
      for (let name of usernames) {
        newRoomRef.set(name, true);
      }
      cb(newRoomRef);  
    });
  }
}