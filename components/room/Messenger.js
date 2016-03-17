import React, {
    Component,
    Text,
    View,
    ListView,
    Animated,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';

import moment from 'moment';

import MessageInput from './message/MessageInput';
import MessageList from './message/MessageList';

type MessageType = {
    text:string;
    name:string;
    image:?Object;
    position:?string;
    date:Date;
    view:?any;
    isOld:boolean;
}

// State manager for messages including MessageList
export default class Messenger extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            dataSource: this._dataSource().cloneWithRows([]),
            isLoadingEarlierMessages: false,
            allLoaded: false,
        };
        
        this._data = [];
        this._rowIds = [];                
    }

    // Define how the context looks like
    // make messenger available to down stream components like: Message and MessageInput
    getChildContext() {
      return {
        messenger: this
      }
    }

    _dataSource() {
      return new ListView.DataSource({
          rowHasChanged: (r1, r2) => {
              if (typeof r1.status !== 'undefined') {
                  return true;
              }
              return r1 !== r2;
          }
      });
    }

    prependMessages(messages:Array<MessageType> = []) {
        let rowID = null;
        for (let message of messages) {
            rowID = _addMessageFirst(messages)
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
        });
        return rowID;
    }

    prependMessage(message:MessageType = {}) {
        return this.prependMessages([message]);
    }

    appendMessages(messages:Array<MessageType> = [], scrollToBottom:boolean = false) {
        let rowID = null;
        for (let message of messages) { 
            message.isOld = true;
            rowID = this._addMessageLast(message);
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds),
            scrollToBottom: scrollToBottom
        });
        return rowID;
    }

    _addMessageFirst(message) {
      this._data.push(message);
      let lastRow = this._data.length - 1;
      this._rowIds.unshift(lastRow);
      return lastRow;      
    }

    _addMessageLast(message) {
      this._data.push(message);
      let lastRow = this._data.length - 1;
      this._rowIds.push(lastRow);
      return lastRow;      
    }

    appendMessage(message:MessageType = {}, scrollToBottom = true) {
       return this.appendMessages([message], scrollToBottom);       
    }

    postLoadEarlierMessages(messages:Array<MessageType> = [], allLoaded = false) {
        this.prependMessages(messages);
        this.setState({
            isLoadingEarlierMessages: false
        });
        if (allLoaded === true) {
            this.setState({
                allLoaded: true
            });
        }
    }

    preLoadEarlierMessages() {
        this.setState({
            isLoadingEarlierMessages: true
        });
        this.props.onLoadEarlierMessages(this._lastMessage(), this.postLoadEarlierMessages.bind(this));
    }

    _lastMessage() {
      return this._data[this._rowIds[this._rowIds.length - 1]]
    }

    refreshRows() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
        });
    }

    _hasRowAt(rowID) {
      return (typeof this._rowIds[this._rowIds.indexOf(rowID)] !== 'undefined');
    }

    _rowAt(rowID) {
      return this._rowIds[this._rowIds.indexOf(rowID)];
    }

    // TODO: refactor nested ifs
    getMessage(rowID) {
      return this._hasRowAt(rowID) ? this._rowAt(rowID) : null;
    }

    // TODO: refactor nested ifs
    getPreviousMessage(rowID) {
      return this._hasRowAt(rowID - 1) ? this.rowAt(rowID - 1) : null; 
    }

    // TODO: refactor nested ifs
    getNextMessage(rowID) {
        return this._hasRowAt(rowID + 1) ? this.rowAt(rowID + 1) : null;
    }

    // TODO: refactor nested ifs
    componentDidMount() {   
        let messages = this.props.messages.concat(this.props.initialMessages);         
        this.appendMessages(messages); 
        this.setState({
            allLoaded: true
        });
    }

    _setErrorMessage(rowID) {
            
    }

    // TODO: refactor nested ifs
    setMessageStatus(status = '', rowID) {
      let currentMessage = this._data[rowID];
      if (currentMessage.position !== 'right')
        return;

      currentMessage.status = status;

      // TODO: refactor for ??
      // only 1 message can have a status
      for (let message of messages) {
          let isCurrentRow = i === rowID;
          if (!isCurrentRow && message.status !== 'error') {
              message.status = '';
          }
      }
      this.refreshRows();              
    }

    renderList() {
        return (
          <MessageList {...this.props} {...this.state}/>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.styles.container]} ref='container'>
                {this.renderList()}
                {this.renderTextInput()}
            </View>
        )
    }

    renderTextInput() {
        if (this.props.hideTextInput)
          return;
          
        return (
          <MessageInput {...this.props} />
        );
    }
}

// access container
Messenger.contextTypes = {
  container: React.PropTypes.object,
}      

// make messenger type available downstream
Messenger.childContextTypes = {
  messenger: React.PropTypes.object,
}      


// Messenger.propTypes = {
//     displayNames: React.PropTypes.bool,
//     placeholder: React.PropTypes.string,
//     styles: React.PropTypes.object,
//     autoFocus: React.PropTypes.bool,
//     onErrorButtonPress: React.PropTypes.func,
//     loadEarlierMessagesButton: React.PropTypes.bool,
//     loadEarlierMessagesButtonText: React.PropTypes.string,
//     onLoadEarlierMessages: React.PropTypes.func,
//     parseText: React.PropTypes.bool,
//     handleUrlPress: React.PropTypes.func,
//     handlePhonePress: React.PropTypes.func,
//     handleEmailPress: React.PropTypes.func,
//     initialMessages: React.PropTypes.array,
//     messages: React.PropTypes.array,
//     handleSend: React.PropTypes.func,
//     onCustomSend: React.PropTypes.func,
//     renderCustomText: React.PropTypes.func,
//     maxHeight: React.PropTypes.number,
//     senderName: React.PropTypes.string,
//     senderImage: React.PropTypes.object,
//     sendButtonText: React.PropTypes.string,
//     onImagePress: React.PropTypes.func,
//     hideTextInput: React.PropTypes.bool,
//     forceRenderImage: React.PropTypes.bool,
//     onChangeText: React.PropTypes.func
// };

Messenger.defaultProps = {
    displayNames: true,
    placeholder: 'Type a message...',
    styles: {},
    autoFocus: true,
    onErrorButtonPress: (message, rowID) => {},
    loadEarlierMessagesButton: false,
    loadEarlierMessagesButtonText: 'Load earlier messages',
    onLoadEarlierMessages: (oldestMessage, callback) => {},
    parseText: false,
    handleUrlPress: (url) => {},
    handlePhonePress: (phone) => {},
    handleEmailPress: (email) => {},
    initialMessages: [],
    messages: [],
    handleSend: (message, rowID) => {},
    maxHeight: Dimensions.get('window').height,
    senderName: 'Sender',
    senderImage: null,
    sendButtonText: 'Send',
    onImagePress: null,
    hideTextInput: false,
    submitOnReturn: false,
    forceRenderImage: false,
    onChangeText: (text) => {}
};

import { useCommon } from '../../styles';
const styles = useCommon('container');