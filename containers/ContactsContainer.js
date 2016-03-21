import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import FirebaseContainer from './FirebaseContainer';

import ContactList from '../components/contact/ContactList';

import Rebase from 're-base';
let base = Rebase.createClass('https://t5-chat.firebaseio.com');


export default class ContactsContainer extends FirebaseContainer {

  constructor(props){
    super(props);
    console.log('props', props);
    this.state = {
        user: this.props.user
    };
    
        
  }

  // Sync with firebase: user-1/contacts            
  get endpoint() {
      console.log('endpoint');
    return [this.props.user.id || 'user-1', 'contacts'].join('/')    
  }
                    
  componentWillMount(){
    super.componentWillMount();      
    

    /*        
    var fakes = [{
        id: 1,
        name: 'Javier Cabrera',
        email: 'cabrera.javier@gmail.com'
    }, {
        id: 2,
        name: 'Kristian Mandrup',
        email: 'kmandrup@gmail.com'
    }];
    base.post('providers/1', {  data: fakes[0]  });    
    base.post('providers/2', {  data: fakes[1]  });    
    */    
    
    

  } 
  
  componentDidMount(){    
  }
      
  render() {
    return (
      <View style={styles.container}>
        <Text>Providers</Text>
        <ContactList {...this.state} />
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  }
});
