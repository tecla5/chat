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
    return this.props.latest;
  }

  // TODO: use Messages adapter!
  // TODO: remove hard-coding which always shows error button!!  
  handleSend(message = {}, rowID = null) {
    // Your logic here
    // Send message.text to your server
    
    // TODO: Here we should use our Firebase adapter
    debugger;
    console.log('_GiftedMessenger', this._GiftedMessenger);
    // this._GiftedMessenger.setMessageStatus('Sent', rowID);
    // this._GiftedMessenger.setMessageStatus('Seen', rowID);
    // this._GiftedMessenger.setMessageStatus('Custom label status', rowID);
    this._GiftedMessenger.setMessageStatus('ErrorButton', rowID); // => In this case, you need also to set onErrorButtonPress
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
  
  // TODO: use Messages adapter!
  onErrorButtonPress(message = {}, rowID = null) {
    // Your logic here
    // Eg: Re-send the message to your server
    
    setTimeout(() => {
      // will set the message to a custom status 'Sent' (you can replace 'Sent' by what you want - it will be displayed under the row)
      this._GiftedMessenger.setMessageStatus('Sent', rowID);
      setTimeout(() => {
        // will set the message to a custom status 'Seen' (you can replace 'Seen' by what you want - it will be displayed under the row)
        this._GiftedMessenger.setMessageStatus('Seen', rowID);
        setTimeout(() => {
          // append an answer
          this.handleReceive({
              text: 'I saw your message', 
              name: 'React-Native', 
              image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
              position: 'left', 
              date: new Date()});
        }, 500);
      }, 1000);
    }, 500);
  }
  
  // will be triggered when the Image of a row is touched
  onImagePress(rowData = {}, rowID = null) {
    // Your logic here
    // Eg: Navigate to the user profile
  }
  
  render() {
    return (
      <Messenger
        ref={(c) => this._GiftedMessenger = c}
    
        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff', // styling of right bubble message
          },
        }}
        
        autoFocus={false}
        messages={this.getMessages()}
        handleSend={this.handleSend}
        onErrorButtonPress={this.onErrorButtonPress}
        maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
        loadEarlierMessagesButton={true}
        onLoadEarlierMessages={this.onLoadEarlierMessages}

        senderName='Developer'
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}
        
        parseText={true} // enable handlePhonePress and handleUrlPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}
        
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
