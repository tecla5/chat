'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform
} from 'react-native';

import Button from 'react-native-button';

import FloatLabelTextInput from 'react-native-floating-label-text-input';
import MdTextField from 'react-native-md-textinput';

import NativeLayout, {
  BorderLayout,
  Center,
  Footer,
  Header,
  LinearLayout,
  HorizontalLinearLayout,
  VerticalLinearLayout
} from 'react-native-layout';

// const { Fill, Top, Left, Right, Bottom } = BorderLayout;

import { setTheme, mdl, MKColor, MKButton, MKTextField } from 'react-native-material-kit';

// customize the material design theme
setTheme({
  primaryColor: MKColor.Purple,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});

const styles = StyleSheet.create({
  textfield: {
    flex: 3,
    height: 28,
    marginTop: 22,
    borderWidth: 1,
    width: 100,
    alignSelf: "stretch"
  },
  sendBtn: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    height: 28,
    marginTop: 22,
    padding: 5,
    marginLeft: 5
  }
});

// colored button with default theme (configurable)
const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

console.log('Textfield', mdl.Textfield);
console.log('Textfield', MKTextField);

const ColoredTextfield = MKTextField.textfield()
  .withPlaceholder('Your message')
  .withStyle(styles.textfield)
  .withTintColor(MKColor.Lime)
  .withTextInputStyle({color: MKColor.Orange})
  .build();

import Rebase from 're-base';
const base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class WriteMessage extends Component {

  constructor(props){
    super(props);
    console.log('create:WriteMessage', props);
    this.state = {
      message: null
    }
  }
    
  _newMsg(event) {
    console.log('_newMsg');
    /*
     * Here, we call .post on the '/chats' ref
     * of our Firebase.  This will do a one-time 'set' on
     * that ref, replacing it with the data prop in the
     * options object.
     *
     * Keeping with the immutable data paradigm in React,
     * you should never mutate, but only replace,
     * the data in your Firebase (ie, use concat
     * to return a mutated copy of your state)
    */

    base.post('messages', {
      // adds message to list of messages
      data: this.props.messages.concat([{
        message: this.state.message
      }]),
      context: this,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: () => {
        console.log('POSTED');
        this.setState({message: null});
      }
    });
  }
  
  _handleChangeText(text) {
    this.setState({message: text});    
  }
      
  render(){
    console.log('render:WriteMessage', this.state.message)
            
    return (
      <Text>Messages go here</Text>
    );
  }   
}
      // <BorderLayout>
      // </BorderLayout>  



        // <Fill><Text>Messages go here</Text></Fill>
        // <Bottom>
        //   <Left>
        //     <ColoredTextfield />
        //   </Left>
        //   <Right>
        //     <ColoredRaisedButton style={styles.sendBtn} />
        //   </Right>
        // </Bottom>


    // <Button
    //     onPress={this._newMsg.bind(this)}
    //     style={styles.sendBtn}
    // >
    //     Send
    // </Button>


// <TextInput style={styles.input}
//     onChangeText={this._handleChangeText.bind(this)}
//     onSubmitEditing={this._newMsg.bind(this)}
//     autoFocus={true}
//     value={this.state.message}
//     placeholder="Your message"
// />        

// <MdTextField 
//   style={styles.input} 
//   placeholder="hello"
  
//   label='Name'
//   highlightColor='#00BCD4'
//   keyboardType='numeric'          
// />


const isAndroid = Platform.OS === 'android';
