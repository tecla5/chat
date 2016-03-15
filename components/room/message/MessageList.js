import React, {
    View,
    Text,
    ListView,
    TextInput,
    Animated,
    Dimensions,
    Platform,
    PixelRatio,
    StyleSheet
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';
import Button from 'react-native-button';

import MessageRow from './MessageRow';
import MessageBridge from './MessageBridge';

// Ideally the ListView is entirely stateless. The state managed by its container (Messenger) and passed down as props
export default class MessageList extends MessageBridge {
    constructor(props) {
      super(props);           
      let listViewMaxHeight = this._listViewMaxHeight();
      
      this.state = {
        firstDisplay: true,
        listHeight: 0,
        footerY: 0,        
        height: new Animated.Value(listViewMaxHeight),
        appearAnim: new Animated.Value(0)
      };
      this.listViewMaxHeight = listViewMaxHeight;
    }      
  
    // make list available to message if needed
    // getChildContext() {
    //   return {
    //     list: this
    //   }
    // }
  
    scrollToBottom() {
        if (this.props.listHeight && this.props.footerY && this.props.footerY > this.props.listHeight) {
            let scrollDistance = this.props.listHeight - this.props.footerY;
            this.scrollResponder.scrollTo({
                y: -scrollDistance
            });
        }
    }

    scrollWithoutAnimationToBottom() {
        if (this.props.listHeight && this.props.footerY && this.props.footerY > this.props.listHeight) {
            let scrollDistance = this.props.listHeight - this.props.footerY;
            this.scrollResponder.scrollTo({
                y: -scrollDistance,
                x: 0,
                animated: false
            });
        }
    }  
    
    componentDidMount() {            
        this.scrollResponder = this.refs.listView.getScrollResponder();
    }
        
    renderRow(rowData = {}, sectionID = null, rowID = null) {
      return (
        <MessageRow 
          rowData={rowData}
          sectionID={sectionID}
          rowID={rowID}
          {...this.props}
          />
      );
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
  
    renderSpinner() {
      return (
        <View style={[styles.loadEarlierMessages, this.props.styles.loadEarlierMessages]}>
          <GiftedSpinner />
        </View>
      );
    }

    renderReloadBtn() {
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

    // always shown in list header
    renderLoadEarlierMessages() {
      if (this.props.allLoaded || !this.props.loadEarlierMessagesButton)
        return;

      return this.props.isLoadingEarlierMessages ? this.renderSpinner() : this.renderReloadBtn(); 
    }
  
    listViewOnLayout(event) {
        let layout = event.nativeEvent.layout;

        this.update({
            listHeight: layout.height
        });

        if (this.props.firstDisplay) {
          // _doFirstDisplay();
        }
    }

    _doFirstDisplay() {
      requestAnimationFrame(()=>{
          this.update({
              firstDisplay: false
          }, function() {
              this.scrollWithoutAnimationToBottom();
          });
      });      
    }
    
    update(newState) {
      this.context.messenger.setState(newState);
    }

    _footerOnLayout(event) {
      let layout = event.nativeEvent.layout;
      this.update({footerY: layout.y});
    }

    listViewRenderFooter() {
        return (
            <View onLayout={this._footerOnLayout.bind(this)}/>
        );
    }  
  
    _listViewMaxHeight() {
        let textInputHeight = 0;
        if (this.props.hideTextInput === false) {
            textInputHeight = 44;
        }

        return this.props.maxHeight - textInputHeight;
    }
  
    // will scroll to bottom after update if told to by Messenger via appendMessage(s)
    componentDidUpdate() {
      if (!this.props.scrollToBottom)
        return;
      setTimeout(() => {
          // inspired by http://stackoverflow.com/a/34838513/1385109
          this.scrollToBottom();
      }, (Platform.OS === 'android' ? 200 : 100));
    }

    render() {
      // debugger;
      return (
        <Animated.View style={{height: this.state.height}}>
          <ListView
              ref='listView'
              style={[styles.listView, this.props.styles.listView]}
              dataSource={this.props.dataSource}
              renderRow={this.renderRow.bind(this)}
              renderHeader={this.renderLoadEarlierMessages.bind(this)}
              onLayout={this.listViewOnLayout.bind(this)}
              renderFooter={this.listViewRenderFooter.bind(this)}
              
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

              {...this.props} />
            </Animated.View>
        );
    }
}

// access messenger
MessageList.contextTypes = {
  // container: React.PropTypes.object,
  messenger: React.PropTypes.object
}      

// make list available downstream
// MessageList.childContextTypes = {
//   list: React.PropTypes.object,
// }      


const styles = StyleSheet.create({
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