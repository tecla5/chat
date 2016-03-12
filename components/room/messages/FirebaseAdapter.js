import BaseAdapter from './BaseAdapter';

export default class FirebaseAdapter extends BaseAdapter {
  // TODO: connect to base
  constructor(base) {    
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
  
  // TODO: post a message
  // Should use a Promise (ie. rebase.post)
  // Should throw an error on Timeout (3 secs)
  post(conversationId, message) {
    return true;
  }  
}  
