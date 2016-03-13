import React, {
  Component,
  View,
  Text  
} from 'react-native';

import FirebaseAdapter from '../adapters/FirebaseAdapter';

export default class FirebaseContainer extends Component {
  constructor(props){
    super(props);    
    this.state = Object.assign({}, this.initialState(props), {loading: true}); 
  }
          
  initialState(props) {
    return {      
    };    
  }    
          
  // uses generic adapter        
  componentWillMount(){
    if (!this._endpoint) {
      throw "Container missing an endpoint. Please set this._endpoint to a firebase path in your constructor";  
    }    
    this.adapter = new FirebaseAdapter({endpoint: this._endpoint});    
    // will sync firebase with local state
    this.adapter.syncState({onSuccess: this._onSynced, ctx: this});
  }

  /*
    * When the component unmounts, we remove the binding.
    * Invoking syncState (or bindToState or listenTo)
    * will return a reference to that listener (see line 30).
    * You will use that ref to remove the binding here.
  */
  componentWillUnmount(){
    this.adapter.disConnect();
  }

  _onSynced(){
    _onSync();
    _onSyncOk();    
  }

  // on successful sync
  _onSync(){ }

  _onSyncOk(){  
    this.state.loading = false; // hides load indicator!
  }

  // TODO: add loading indicator    
  render() {
    return (
      <View>
        <Text>Firebase container: {this._endpoint} {this.state.loading}</Text>
      </View>      
    );
  }
}
