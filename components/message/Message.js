'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

import Button from 'react-native-button';

export default class Message extends React.Component {
  render(){
    return (
      <View>     
        <Text>{ this.props.text }</Text>
      </View>
    );
  }
}

// Message.propTypes = { 
//   message: React.PropTypes.string
// }

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


/*
        <li
            onClick={ this.props.handleClick.bind(null) }
            className={ this.props.show ? 'bg-warning' : 'bg-info'}>
            <button
                onClick={ this.props.removeMessage.bind(null) }
                className='btn btn-danger'>X
            </button>
                { this.props.thread.title }
                { this.props.show && <p> { this.props.thread.message } </p> }
        </li>

 */

