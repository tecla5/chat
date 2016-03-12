import React, {
  Component,
  StyleSheet,
  Text,
  View
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
          
  componentWillMount(){
    if (!this._endpoint) {
      throw "Container missing an endpoint. Please set this._endpoint to a firebase path in your constructor";  
    }    
    this.adapter = new FirebaseAdapter({endpoint: this._endpoint});    
    // will sync firebase with local state
    this.adapter.syncState({onSuccess: this._onSynced, ctx: this});
  }

  componentWillUnmount(){
    /*
     * When the component unmounts, we remove the binding.
     * Invoking syncState (or bindToState or listenTo)
     * will return a reference to that listener (see line 30).
     * You will use that ref to remove the binding here.
     */
    this.adapter.disConnect();
  }

  _onSynced(){
    _onSync()
    _onSyncOk();    
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
      <View style={styles.container}>
        <Text>Firebase container: {this._endpoint} {this.state.loading}</Text>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
