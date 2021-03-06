'use strict';

import React, {
  Component,
  LinkingIOS,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text
} from 'react-native';

import Messenger from './Messenger';
import Communications from 'react-native-communications';

// replace with db/server Firebase connections 
// import messages from './messages';

// TODO: move thi logic!?
const navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
// @todo check Navigator.NavigationBar.Styles.General.NavBarHeight
const statusBarHeight = (Platform.OS === 'android' ? 25 : 0);

// if we use Component class we need to use .bind(this) in render() 
export default class Conversation extends Component {     

  constructor(props){
    super(props);
    this.state = {
      messages: this.props.messages
    };          
  }  

  // latest messages sent down from container which syncs with Firebase messages collection
  // messages then divided into earlier and latest on state and passed down as props
  getMessages() {
    // return this.messages.latest();
    return this.props.latest || [];
  }

  // Send message to server  
  handleSend(message = {}, rowID = null) {    
    // status can be any of 'Sent', 'Seen' or 'ErrorButton'
    // See message/Message renderStatus() and styles.status
    let onSent = (err) => {
      // console.log('Sent', message);
      let status = {};
      status.type = err ? 'error' : 'sentOk';
      this._GiftedMessenger.setMessageStatus(status, rowID);
    }
  
    // we use our Firebase adapter to send
    this.context.adapter.post(message, {then: onSent, ctx: this});        
  }
    
  // TODO: use Messages adapter!
  // @oldestMessage is the oldest message already added to the list
  onLoadEarlierMessages(oldestMessage = {}, callback = () => {}) {    

    // Your logic here
    // Eg: Retrieve old messages from your server

    // newest messages have to be at the begining of the array
    var earlierMessages = this.messages.earlier();
    
    setTimeout(() => {
      callback(earlierMessages, false); // when second parameter is true, the "Load earlier messages" button will be hidden      
    }, 1000);
  }
  
  handleReceive(message = {}) {
    this._GiftedMessenger.appendMessage(message);
  }
  
  // use Firebase adapter!
  onErrorButtonPress(message = {}, rowID = null) {
    // Your logic here
    // Eg: Re-send the message to your server
    this.handleSend(message, rowId);    
  }
  
  // will be triggered when the Image of a row is touched
  onImagePress(rowData = {}, rowID = null) {
    // Your logic here
    // Eg: Navigate to the user profile
    console.log('TODO: Go to user profile', rowData, rowId);
  }
  
  render() {
    return (
      <Messenger
        ref={(c) => this._GiftedMessenger = c}        
        autoFocus={false}
        messages={this.getMessages()}
        handleSend={this.handleSend.bind(this)}
        onErrorButtonPress={this.onErrorButtonPress}
        maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
        loadEarlierMessagesButton={true}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

        senderName='Developer'
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}
        
        parseText={true} // enable handlePhonePress and handleUrlPress
        handlePhonePress={this.handlePhonePress.bind(this)}
        handleUrlPress={this.handleUrlPress.bind(this)}
        handleEmailPress={this.handleEmailPress.bind(this)}
        
        inverted={true}
      />

    );
  }
  
  handleUrlPress(url) {
    if (Platform.OS !== 'android') {
      LinkingIOS.openURL(url);
    }
  }

  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;
    
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  }
  
  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }
}

// That's the only thing you need to add
Conversation.contextTypes = {
  adapter: React.PropTypes.object
}      
