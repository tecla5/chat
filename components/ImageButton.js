'use strict';

import React, {
  Component,
  Image
} from 'react-native';

import TouchableWithoutFeedback from 'TouchableWithoutFeedback';

const defaultSrc = 'http://facebook.github.io/react/img/logo_og.png';

export default class ImageButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Image
            style={[styles.icon, this.props.icon]}
            source={{uri: this.props.uri || defaultSrc}}   
        />
      </TouchableWithoutFeedback>      
    );
  }  
} 

import { merge, common } from '../styles';

const styles = merge({
  icon: common.icon
});    
