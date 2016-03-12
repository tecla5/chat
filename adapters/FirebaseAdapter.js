import BaseAdapter from './BaseAdapter';
import Rebase from 're-base';

export default class FirebaseAdapter extends BaseAdapter {
  // TODO: connect to base
  constructor(options = {url: 'https://t5-chat.firebaseio.com', endpoint: 'messages', array: true}) {
    this.endpoint = options.endpoint;   
    this.asArray = options.array;
    this.base = Rebase.createClass(url);  
  }

  // onSuccess: function
  syncState(options) {
    // will sync messages on state
    this.ref = base.syncState(this.endpoint, {
      context: options.ctx,
      state: this.endpoint,
      asArray: this.asArray || options.asArray,
      then: options.onSuccess 
    });   
  }
  
  closeConnection() {
    this.base.removeBinding(this.ref);
  }
  
  // Post a message to firebase messages list
  // TODO: Should throw an error on Timeout (3 secs)
  // TODO: Should (perhaps) use priority (see firechat example)
  
  /*
    * Here, we call .post on the '/chats' ref
    * of our Firebase.  This will do a one-time 'set' on
    * that ref, replacing it with the data prop in the
    * options object.
    *
    * Keeping with the immutable data paradigm in React,
    * you should never mutate, but only replace,
    * the data in your Firebase (ie, use concat
    * to return a mutated copy of your state)
  */  
  post(conversationId, message, options = {}) {
    this.base.post(this.endpoint, {
      data: message,
      context: options.ctx,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: options.onSuccess
    });
  }  
}  
