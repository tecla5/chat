import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

//import Firebase from 'firebase';
import Rebase from 're-base';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class ContactList extends Component {

  constructor(props){
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      contacts: ds.cloneWithRows(this.props.contacts),
    });    
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
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contact: {
    textAlign: 'left',
    color: '#666',
    margin: 5,
  },
  provider: {
    color: 'blue',
  },
  client: {
    color: 'green',
  },
});
