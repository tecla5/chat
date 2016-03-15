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
        for (let i = 0; i < messages.length; i++) {
            this._data.push(messages[i]);
            this._rowIds.unshift(this._data.length - 1);
            rowID = this._data.length - 1;
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
        for (let i = 0; i < messages.length; i++) {
            messages[i].isOld = true;
            this._data.push(messages[i]);
            this._rowIds.push(this._data.length - 1);
            rowID = this._data.length - 1;
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds),
            scrollToBottom: scrollToBottom
        });
        return rowID;
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
        this.props.onLoadEarlierMessages(this._data[this._rowIds[this._rowIds.length - 1]], this.postLoadEarlierMessages.bind(this));
    }

    refreshRows() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
        });
    }

    getMessage(rowID) {
        if (typeof this._rowIds[this._rowIds.indexOf(rowID)] !== 'undefined') {
            if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID)]] !== 'undefined') {
                return this._data[this._rowIds[this._rowIds.indexOf(rowID)]];
            }
        }
        return null;
    }

    getPreviousMessage(rowID) {
        if (typeof this._rowIds[this._rowIds.indexOf(rowID - 1)] !== 'undefined') {
            if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID - 1)]] !== 'undefined') {
                return this._data[this._rowIds[this._rowIds.indexOf(rowID - 1)]];
            }
        }
        return null;
    }

    getNextMessage(rowID) {
        if (typeof this._rowIds[this._rowIds.indexOf(rowID + 1)] !== 'undefined') {
            if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID + 1)]] !== 'undefined') {
                return this._data[this._rowIds[this._rowIds.indexOf(rowID + 1)]];
            }
        }
        return null;
    }

    componentDidMount() {            
        if (this.props.messages.length > 0) {
            this.appendMessages(this.props.messages);
        } else if (this.props.initialMessages.length > 0) {
            this.appendMessages(this.props.initialMessages);
        } else {
            this.setState({
                allLoaded: true
            });
        }
    }

    setMessageStatus(status = '', rowID) {
        if (!this._data[rowID]) {
          throw 'error rowID no data';
        }
        if (status === 'ErrorButton') {
            if (this._data[rowID].position === 'right') {
                this._data[rowID].status = 'ErrorButton';
                this.refreshRows();
            }
        } else {
            if (this._data[rowID].position === 'right') {
                this._data[rowID].status = status;

                // only 1 message can have a status
                for (let i = 0; i < this._data.length; i++) {
                    if (i !== rowID && this._data[i].status !== 'ErrorButton') {
                        this._data[i].status = '';
                    }
                }
                this.refreshRows();
            }
        }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 2,
        // borderColor: 'green',
        // backgroundColor: 'lime',
        marginTop: 47, // to not be behind top NavBar
        // marginBottom: 40
    }
});