import FirebaseAdapter from '../adapters/FirebaseAdapter';

export default class Model {
  constructor(model, adapter) {
    this.adapter = adapter || new FirebaseAdapter({endpoint: model});
    this.ref = this.adapter.ref;    
  }
    
  findBy(criteria = {}, cb) {
    let keys = Object.keys(criteria);
    let key = keys[0]; 
    let value = criteria[key];
    this.ref.orderByChild(key).equalTo(value).on('child_added', function(snapshot) {
       // return new user matching criteria 
       cb(snapshot);
    });    
  }
  
  // use callback?        
  create(data, cb) {    
    return this.ref.push(data);
  }  

  // use callback?        
  createAt(child, data, cb) {    
    return this.ref.child(child).push(data);
  }  
}