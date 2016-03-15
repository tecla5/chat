import React, {
    Component
} from 'react-native';

export default class MessageBridge extends Component {
  constructor(props) {
    super(props);
  }

  getNextMessage(rowID) {
    return this.context.messenger.getNextMessage(rowID);
  }

  getPreviousMessage(rowID) {
    return this.context.messenger.getPreviousMessage(rowID);
  }
  
  appendMessage(message) {
    return this.context.messenger.appendMessage(message);
  }  
}
