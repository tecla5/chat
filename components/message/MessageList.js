'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Message from './Message';

export default class MessageList extends Component {

  constructor(props){
    super(props);
    console.log('MessageList:props', this.props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      messages: ds.cloneWithRows(this.props.messages),
    };    
  }
                
  render() {
    console.log('MessageList:render', this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <ListView dataSource={ this.state.messages } renderRow={this._renderMessage}/>
      </View>      
    );
  }
  
  _renderMessage(msg) {
    return <Message {...msg}/>;
  }
}

// MessageList.propTypes = { 
//   messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
