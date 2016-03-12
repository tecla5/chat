import mocks from './mocks';
import BaseAdapter from './BaseAdapter';

export default class MockAdapter extends BaseAdapter {
  // TODO: connect to base
  constructor(base) {    
  }

  // get all messages?
  all() {
    return [];
  }

  // TODO: get earlier via timestamp query
  earlier() {
    return mocks.earlier;
  }  

  // TODO: get latest via timestamp query
  latest() {
    return mocks.latest;
  }
  
  // TODO: post a message
  // Should return/use a "mock" Promise to simulate success or error on send
  post(conversationId, message) {
    return true;
  }  
}  

