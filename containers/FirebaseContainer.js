import React, {
  Component,
  View,
  Text  
} from 'react-native';

import FirebaseAdapter from '../adapters/FirebaseAdapter';

export default class FirebaseContainer extends Component {
  constructor(props){
    super(props);  
    this.configState();
  }
  
  configState() {
    this.state = Object.assign({}, 
      this.initialState(), 
      {loading: true}
    );
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
      throw "Container missing an endpoint. Please set create a `get endpoint()` that returns a firebase path";  
    }    
    this.adapter = new FirebaseAdapter({endpoint: this.endpoint});
    
    // call fetch or sync depending on type of data binding (one- or two-way, ie. read only or read/write)
    this[this.type]();    
  }

  // sync by default  
  get type() {
    return 'sync';
  }  

  // will sync firebase with local state
  sync() {    
    this.adapter.syncState({then: this._onSynced, ctx: this});    
  }

  fetch() {    
    this.adapter.fetch({then: this._onFetched, failure: this._onFail, ctx: this});    
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
  
  _onFetched(data) {
    this.setState({
      user: data
    }); 
  }
  
  // handle error on fetch
  _onFail(err) {
    console.error(err);
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
