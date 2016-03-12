import mocks from './mocks';
import BaseAdapter from './BaseAdapter';

export default class MockAdapter extends BaseAdapter {
  constructor(options) {        
  }
  
  closeConnection() {    
  }
  
  // onSuccess: function
  syncState(options) {  
    options.onSuccess();
  }
  
  post(conversationId, message, options) {
    options.onSuccess();
  }  
}  

