import React, {
  Component,
  View,
  Text  
} from 'react-native';

import FirebaseAdapter from '../adapters/FirebaseAdapter';

export default class FirebaseContainer extends Component {
  constructor(props){
    super(props);  
  }
  
  setEndpoint() {
    this.state = Object.assign({}, 
      this.initialState(), 
      {loading: true}
    );
    console.log('rooms state', this.state)
  }

  // creates initial state as: {messages: []} for a '[userId]/messages' endpoint.          
  initialState() {
    var x = {};
    x[this._defaultState()] = [];
    return x;    
  }    

  // find last part of endpoint
  _defaultState() {
    return this.endpoint.match(/\/?(\w+)$/)[1];  
  }
          
  // uses generic adapter        
  componentWillMount(){
    if (!this.endpoint) {
      throw "Container missing an endpoint. Please set this._endpoint to a firebase path in your constructor";  
    }    
    this.adapter = new FirebaseAdapter({endpoint: this.endpoint});    
    // will sync firebase with local state
    this.adapter.syncState({then: this._onSynced, ctx: this});
  }

  /*
    * When the component unmounts, we remove the binding.
    * Invoking syncState (or bindToState or listenTo)
    * will return a reference to that listener (see line 30).
    * You will use that ref to remove the binding here.
  */
  componentWillUnmount(){
    this.adapter.closeConnection();
  }

  _onSynced(){
    this._onSync();
    this._onSyncOk();    
  }

  // on successful sync
  _onSync(){ 
    
  }

  _onSyncOk(){  
    this.state.loading = false; // hides load indicator!
  }

  // TODO: add loading indicator    
  render() {
    return (
      <View>
        <Text>Firebase container: {this.endpoint} {this.state.loading}</Text>
      </View>      
    );
  }
}
