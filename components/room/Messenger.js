import React, {
    Component,
    Text,
    View,
    ListView,
    TextInput,
    Dimensions,
    Animated,
    Platform,
    PixelRatio,
    StyleSheet
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';
import moment from 'moment';
import Button from 'react-native-button';

import MessageInput from './message/MessageInput'; 
import Message from './message/Message';

type MessageType = {
    text:string;
    name:string;
    image:?Object;
    position:?string;
    date:Date;
    view:?any;
    isOld:boolean;
}

export default class Messenger extends Component {
    constructor(props) {
        super(props);
        
        let listViewMaxHeight = this._listViewMaxHeight();
        
        this.state = {
            firstDisplay: true,
            listHeight: 0,
            footerY: 0,

            dataSource: this._dataSource().cloneWithRows([]),
            text: '',
            disabled: true,
            height: new Animated.Value(listViewMaxHeight),
            isLoadingEarlierMessages: false,
            allLoaded: false,
            appearAnim: new Animated.Value(0)
        };
        
        this._data = [];
        this._rowIds = [];
        this.listViewMaxHeight = listViewMaxHeight;
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

    appendMessages(messages:Array<MessageType> = []) {
        let rowID = null;
        console.log('append messages to data', this._data, this._rowIds, messages);
        for (let i = 0; i < messages.length; i++) {
            messages[i].isOld = true;
            this._data.push(messages[i]);
            this._rowIds.push(this._data.length - 1);
            rowID = this._data.length - 1;
        }
        console.log('set state of list dataSource', this._data, this._rowIds);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
        });
        return rowID;
    }

    appendMessage(message:MessageType = {}, scrollToBottom = true) {
        console.log('container appendMessage', message);
        let rowID = this.appendMessages([message]);
        console.log('gets row id', rowID);
        if (scrollToBottom === true) {
            setTimeout(() => {
                // inspired by http://stackoverflow.com/a/34838513/1385109
                this.scrollToBottom();
            }, (Platform.OS === 'android' ? 200 : 100));
        }
        return rowID;
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

    _listViewMaxHeight() {
        let textInputHeight = 0;
        if (this.props.hideTextInput === false) {
            textInputHeight = 44;
        }

        return this.props.maxHeight - textInputHeight;
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

    renderDate(rowData = {}, rowID = null) {
        let diffMessage = null;
        if (rowData.isOld === true) {
            diffMessage = this.getPreviousMessage(rowID);
        } else {
            diffMessage = this.getNextMessage(rowID);
        }
        if (rowData.date instanceof Date) {
            if (diffMessage === null) {
                return (
                    <Text style={[styles.date, this.props.styles.date]}>
                        {moment(rowData.date).calendar()}
                    </Text>
                );
            } else if (diffMessage.date instanceof Date) {
                let diff = moment(rowData.date).diff(moment(diffMessage.date), 'minutes');
                if (diff > 5) {
                    return (
                        <Text style={[styles.date, this.props.styles.date]}>
                            {moment(rowData.date).calendar()}
                        </Text>
                    );
                }
            }
        }
        return null;
    }

    renderRow(rowData = {}, sectionID = null, rowID = null) {
        let diffMessage = null;
        if (rowData.isOld === true) {
            diffMessage = this.getPreviousMessage(rowID);
        } else {
            diffMessage = this.getNextMessage(rowID);
        }

        console.log('render message with: ', rowData, rowID);

        return (            
            <View>
                {this.renderDate(rowData, rowID)}
                <Message
                    rowData={rowData}
                    rowID={rowID}
                    onErrorButtonPress={this.props.onErrorButtonPress}
                    displayNames={this.props.displayNames}
                    diffMessage={diffMessage}
                    position={rowData.position}
                    forceRenderImage={this.props.forceRenderImage}
                    onImagePress={this.props.onImagePress}
                    renderCustomText={this.props.renderCustomText}
                    styles={styles}/>
            </View>
        )
    }


    componentDidMount() {            
        this.scrollResponder = this.refs.listView.getScrollResponder();

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

    onKeyboardWillHide(e) {
        Animated.timing(this.state.height, {
            toValue: this.listViewMaxHeight,
            duration: 150
        }).start();
    }

    onKeyboardWillShow(e) {
        Animated.timing(this.state.height, {
            toValue: this.listViewMaxHeight - (e.endCoordinates ? e.endCoordinates.height : e.end.height),
            duration: 200
        }).start();
    }

    onKeyboardDidShow(e) {
        if(Platform.OS == 'android') {
            this.onKeyboardWillShow(e);
        }
        this.scrollToBottom();
    }

    onKeyboardDidHide(e) {
        if(Platform.OS == 'android') {
            this.onKeyboardWillHide(e);
        }
    }

    scrollToBottom() {
        if (this.state.listHeight && this.state.footerY && this.state.footerY > this.state.listHeight) {
            let scrollDistance = this.state.listHeight - this.state.footerY;
            this.scrollResponder.scrollTo({
                y: -scrollDistance
            });
        }
    }

    scrollWithoutAnimationToBottom() {
        if (this.state.listHeight && this.state.footerY && this.state.footerY > this.state.listHeight) {
            let scrollDistance = this.state.listHeight - this.state.footerY;
            this.scrollResponder.scrollTo({
                y: -scrollDistance,
                x: 0,
                animated: false
            });
        }
    }

    renderLoadEarlierMessages() {
        if (this.props.loadEarlierMessagesButton === true) {
            if (this.state.allLoaded === false) {
                if (this.state.isLoadingEarlierMessages === true) {
                    return (
                        <View style={[styles.loadEarlierMessages, this.props.styles.loadEarlierMessages]}>
                            <GiftedSpinner />
                        </View>
                    );
                } else {
                    return (
                        <View style={[styles.loadEarlierMessages, this.props.styles.loadEarlierMessages]}>
                            <Button
                                style={[styles.loadEarlierMessagesButton, this.props.styles.loadEarlierMessagesButton]}
                                onPress={this.preLoadEarlierMessages.bind(this)}>
                                {this.props.loadEarlierMessagesButtonText}
                            </Button>
                        </View>
                    );
                }
            }
        }
        return null;
    }

    setMessageStatus(status = '', rowID) {
        if (!this._data[rowID]) {
          console.log('error rowID no data', rowID);
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

    listViewOnLayout(event) {
        let layout = event.nativeEvent.layout;
        this.setState({
            listHeight: layout.height
        });
        if (this.state.firstDisplay === true) {
            requestAnimationFrame(()=>{
                this.setState({
                    firstDisplay: false
                }, function() {
                    this.scrollWithoutAnimationToBottom();
                });
            });
        }
    }

    listViewRenderFooter() {
        return (
            <View onLayout={(event)=>{
                let layout = event.nativeEvent.layout;
                this.setState({footerY: layout.y});
                }}/>
        );
    }

    renderAnimatedView() {
        return (
            <Animated.View style={{height: this.state.height}}>
                <ListView
                    ref='listView'
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderLoadEarlierMessages.bind(this)}
                    onLayout={this.listViewOnLayout.bind(this)}
                    renderFooter={this.listViewRenderFooter.bind(this)}
                    style={[styles.listView, this.props.styles.listView]}

                    // not working android RN 0.14.2
                    onKeyboardWillShow={this.onKeyboardWillShow.bind(this)}
                    onKeyboardDidShow={this.onKeyboardDidShow.bind(this)}
                    onKeyboardWillHide={this.onKeyboardWillHide.bind(this)}
                    onKeyboardDidHide={this.onKeyboardDidHide.bind(this)}

                    /*
                      keyboardShouldPersistTaps={false} // @issue keyboardShouldPersistTaps={false} + textInput focused = 2 taps are needed to trigger the ParsedText links
                      keyboardDismissMode='interactive'
                    */
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode='interactive'

                    initialListSize={10}
                    pageSize={this.props.messages.length}

                    {...this.props}/>
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.styles.container]} ref='container'>
                {this.renderAnimatedView()}
                {this.renderTextInput()}
            </View>
        )
    }

    renderTextInput() {
        if (this.props.hideTextInput === false) {
            return (
              <MessageInput {...this.props} />
            );
        }
        return null;
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


Messenger.propTypes = {
    displayNames: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    styles: React.PropTypes.object,
    autoFocus: React.PropTypes.bool,
    onErrorButtonPress: React.PropTypes.func,
    loadEarlierMessagesButton: React.PropTypes.bool,
    loadEarlierMessagesButtonText: React.PropTypes.string,
    onLoadEarlierMessages: React.PropTypes.func,
    parseText: React.PropTypes.bool,
    handleUrlPress: React.PropTypes.func,
    handlePhonePress: React.PropTypes.func,
    handleEmailPress: React.PropTypes.func,
    initialMessages: React.PropTypes.array,
    messages: React.PropTypes.array,
    handleSend: React.PropTypes.func,
    onCustomSend: React.PropTypes.func,
    renderCustomText: React.PropTypes.func,
    maxHeight: React.PropTypes.number,
    senderName: React.PropTypes.string,
    senderImage: React.PropTypes.object,
    sendButtonText: React.PropTypes.string,
    onImagePress: React.PropTypes.func,
    hideTextInput: React.PropTypes.bool,
    forceRenderImage: React.PropTypes.bool,
    onChangeText: React.PropTypes.func
};

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
        backgroundColor: '#FFF'
    },
    listView: {
        flex: 1
    },
    date: {
        color: '#aaaaaa',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
    },
    link: {
        color: '#007aff',
        textDecorationLine: 'underline'
    },
    linkLeft: {
        color: '#000'
    },
    linkRight: {
        color: '#fff'
    },
    loadEarlierMessages: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadEarlierMessagesButton: {
        fontSize: 14
    }
});