import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

import Message from './Message';

//import Firebase from 'firebase';
import Rebase from 're-base';

let base = Rebase.createClass('https://t5-chat.firebaseio.com');

export default class MessageList extends Component {

  constructor(props){
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      messages: ds.cloneWithRows(this.props.messages),
    });    
  }
            
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={ this.state.messages } renderRow={this._renderMessage}/>
      </View>      
    );
  }
  
  _renderMessage(msg) {
    return <Message {...msg}/>;
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
