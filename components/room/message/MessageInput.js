import React, {
    Text,
    View,
    TextInput,
    PixelRatio,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import MessageBridge from './MessageBridge';

export default class MessageInput extends MessageBridge {
  constructor(props) {
      super(props);
      this.state = {
        text: '',
        disabled: true
      }
  }
    
  onSend() {
    let message = {
        text: this.state.text.trim(),
        name: this.props.senderName,
        image: this.props.senderImage,
        position: 'right',
        date: new Date()
    };
    if (this.props.onCustomSend) {
        this.props.onCustomSend(message);
    } else {
        let rowID = this.appendMessage(message);

        this.props.handleSend(message, rowID);
        this.onChangeText('');
    }
  }  
  
  onChangeText(text) {
    this.setState({
        text: text
    });
    if (text.trim().length > 0) {
        this.setState({
            disabled: false
        });
    } else {
        this.setState({
            disabled: true
        });
    }
    this.props.onChangeText(text);
  }
  
  render() {
    return (
      <View style={[styles.textInputContainer, this.props.styles.textInputContainer]}>
          <TextInput
              style={[styles.textInput, this.props.styles.textInput]}
              placeholder={this.props.placeholder}
              ref='textInput'
              onChangeText={this.onChangeText.bind(this)}
              value={this.state.text}
              autoFocus={this.props.autoFocus}
              returnKeyType={this.props.submitOnReturn ? 'send' : 'default'}
              onSubmitEditing={this.props.submitOnReturn ? this.onSend.bind(this) : null}
              blurOnSubmit={false}/>
          <Button
              style={[styles.sendButton, this.props.styles.sendButton]}
              styleDisabled={[this.props.styles.sendButtonDisabled]}
              onPress={this.onSend.bind(this)}
              disabled={this.state.disabled}>
              {this.props.sendButtonText}
          </Button>
      </View>        
    );
  }
}

// access messenger
MessageInput.contextTypes = {
  // container: React.PropTypes.object,
  messenger: React.PropTypes.object
}      

const styles = StyleSheet.create({
    textInputContainer: {
        height: 44,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#b2b2b2',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    textInput: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        backgroundColor: '#FFF',
        flex: 1,
        padding: 0,
        margin: 0,
        fontSize: 15
    },
    sendButton: {
        marginTop: 11,
        marginLeft: 10
    }
});