export default class BaseAdapter {
  constructor(options) {        
  }
  
  closeConnection() {    
  }
  
  // call then to signal success
  syncState(options) {  
    options.then();
  }

  // call then to signal success  
  post(message, options) {
    options.then();
  }
}  
