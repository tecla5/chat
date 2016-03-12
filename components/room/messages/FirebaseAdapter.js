import BaseAdapter from './BaseAdapter';
import Rebase from 're-base';

export default class FirebaseAdapter extends BaseAdapter {
  // TODO: connect to base
  constructor(url = 'https://t5-chat.firebaseio.com/') {   
    this.base = Rebase.createClass(url);    
  }

  // get all messages?
  all(conversationId) {
    return [];
  }

  // TODO: get earlier via timestamp query
  earlier(conversationId) {
    return [];
  }  

  // TODO: get latest via timestamp query
  latest(conversationId) {
    return [];
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
  post(conversationId, message, postedFn, ctx) {
    this.base.post('messages', {
      data: message,
      context: ctx,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: postedFn
    });
  }  
}  
