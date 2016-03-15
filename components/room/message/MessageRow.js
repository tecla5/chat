import React, {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Message from './Message';
import MessageBridge from './MessageBridge';
import MessageDate from './MessageDate';
import moment from 'moment';

export default class MessageRow extends MessageBridge {
  constructor(props) {
    super(props);      
  }

  renderDate(rowData, rowID) {
    return (
      <MessageDate {...this.props}/>
    );
  }

  render() {
      return (            
          <View>
              {this.renderDate()}
              <Message
                  rowData={this.props.rowData}
                  rowID={this.props.rowID}
                  onErrorButtonPress={this.props.onErrorButtonPress}
                  displayNames={this.props.displayNames}
                  position={this.props.rowData.position}
                  forceRenderImage={this.props.forceRenderImage}
                  onImagePress={this.props.onImagePress}
                  renderCustomText={this.props.renderCustomText}
                  styles={this.props.styles}/>
          </View>
      )
  }
}

// access messenger
MessageRow.contextTypes = {
  // container: React.PropTypes.object,
  messenger: React.PropTypes.object
}      
