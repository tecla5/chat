import Model from './Model';
import Contacts from './Contacts';

export default class Users extends Model {
  constructor(model  = 'users', adapter) {
    super(model, adapter);    
    this.contacts = new Contacts('contacts');
  }
  
  addContact(email) {
    this.findBy({email: email}, (user) => {
      this.contacts.createAt(user.userId, user);  
    })
  }
    
  // use callback?        
  create(user, cb) {    
    return this.ref.push(user);
  }
}
