'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import TouchableWithoutFeedback from 'TouchableWithoutFeedback';

import { Actions } from 'react-native-router-flux'

import ImageButton from '../ImageButton';

import { users } from '../../fake';
/*
  Expected data format for a user profile:
  {
    id: '2472357239237',
    userId: 'kmandrup',
    fullName: 'Kristian Mandrup',
    description: 'Oh so nice, full of spice!',
    email: 'kmandrup@gmail.com',
    phone: '+44 135832140',
    image: 'my/sweet-selfie.png',
    thumbnail: 'my/cool-thumb.png',    
  }
*/

const UserDetails = (props, state) => {
  return (
    <View>
      <Text>{ this.props.fullName }</Text>
      <Text>{ this.props.email }</Text>
      <Text>{ this.props.phone }</Text>
    </View>    
  );
}


export default class UserProfile extends Component {
  // expect to get an Id or a User?
  constructor(props){
    super(props);
    console.log('USER profile', props);
  }
  
  render() {
    return (      
        <View style={[styles.listItem, styles.userProfile]} >
          <ImageButton {...this.props} onPress={this._showMainPic.bind(this)} />
          <UserDetails {...this.props} />
        </View>      
    );
  }  
  
  _showMainPic() {
    // open a modal with main picture in full size
    console.log('show main pic');
  }
}

// define PropTypes

import { merge, common } from '../../styles';

const styles = merge({
    listItem: common.listItem
  }, {
    userProfile: {
      backgroundColor: 'green'
    }
  }
); 





