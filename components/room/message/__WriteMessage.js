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

const ColoredTextfield = MKTextField.textfield()
  .withPlaceholder('Your message')
  .withStyle(styles.textfield)
  .withTintColor(MKColor.Lime)
  .withTextInputStyle({color: MKColor.Orange})
  .build();

const isAndroid = Platform.OS === 'android';

export default class WriteMessage extends Component {

  constructor(props){
    super(props);
    console.log('create:WriteMessage', props);
    this.state = {
      message: null
    }
  }
  
  adapter() {
    return this.context.adapter; 
  }
    
  _newMsg(event) {
    console.log('_newMsg');
    this.adapter.post(this._messageData(), {onSuccess: this._messagePosted, ctx: this});
  }

  // concat?
  _messageData() {
    return this.state.message;
  }

  _messagePosted() {
    console.log('POSTED');
    this.setState({message: null});
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

// That's the only thing you need to add
WriteMessage.contextTypes = {
  adapter: React.PropTypes.object
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

