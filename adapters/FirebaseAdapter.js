import BaseAdapter from './BaseAdapter';
import Rebase from 're-base';

export default class FirebaseAdapter extends BaseAdapter {
  // TODO: connect to base
  constructor(options = {}) {
    super();
    
    // TODO: Firebase url should be loaded from a config file or ENV variable
    options.url = options.url || 'https://t5-chat.firebaseio.com';
        
    this.endpoint = options.endpoint;   
    this.asArray = options.array || options.asArray;    
    this.base = Rebase.createClass(options.url);  
  }

  get endpoint() {
    return this._endpoint;
  }

  set endpoint(_endpoint) {
    if (!_endpoint)
      throw 'Firebase endpoint must be a string';
    this._endpoint = _endpoint;
  }
  
  // find last part of endpoint
  _defaultState() {
    try {
      return this.endpoint.match(/\/?(\w+)$/)[0];  
    } catch (e) {
      return null
    }    
  }

  closeConnection() {
    this.base.removeBinding(this.ref);
  }

  reset() {
    this.base.reset();
  }

  // call then to signal success
  syncState(options) {
    // will sync messages on state
    this.ref = this.base.syncState(this.endpoint, {
      context: options.ctx,
      state: this._defaultState() || this.state,
      asArray: this.asArray || options.asArray,
      queries: options.queries,
      then: options.then 
    });   
  }
  
  bindState(options) {
    this.ref = this.base.bindState(this.endpoint, {
      context: options.ctx,
      state: this._defaultState() || this.state,
      asArray: this.asArray || options.asArray,
      queries: options.queries,
      then: options.then 
    });       
  }
  
  listen(options) {
    this.ref = this.base.listenTo(this.endpoint, {
      context: options.ctx,
      asArray: this.asArray || options.asArray,
      queries: options.queries,
      then: options.then
    });           
  }
  
  fetch(options) {
    this.ref = this.base.fetch(this.endpoint, {
      context: options.ctx,
      asArray: this.asArray || options.asArray,
      queries: options.queries,
      then: options.then, 
      timeout: options.timeout,
      failure: options.failure
    });               
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
  post(data, options = {}) {
    console.log('post message:', data, ' to:', this.endpoint )
    this.base.post(this.endpoint, {
      data: data,
      context: options.ctx,
      // on error will be passed an Error object
      then: options.then
    });
  }  

  push(data, options = {}) {
    return this.base.push(this.endpoint, {
      data: data,
      // context: options.ctx,
      // on error will be passed an Error object
      then: options.then
    });
  }  
}  
