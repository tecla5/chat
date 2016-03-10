'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Contact from './Contact';

export default class ContactList extends Component {

  constructor(props){
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      contacts: ds.cloneWithRows(this.props.contacts),
    };    
  }
            
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={ this.state.contacts } renderRow={this._renderContact}/>
      </View>      
    );
  }
  
  _renderContact(msg) {
    return <Contact {...msg}/>;
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
