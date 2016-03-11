'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Messenger from '../Messenger.js';

export default class ChatRoom extends Component {
  constructor(props){
    super(props);
    console.log('create:ChatRoom', props);
  }
    
  render() {
    console.log('ChatRoom:props', this.props);
    
    return (
        <View style={styles.container}>
            <Messenger {...this.props} />
        </View>                    
    );
  }
}

// ChatRoom.propTypes = { 
//   messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
//   message: React.PropTypes.string
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
