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

import fake from '../../fake';
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
export default class UserProfile extends Component {
  // expect to get an Id or a User?
  constructor(props){
    super(props);
    console.log('profile', props);
  }
  
  render() {
    return (      
        <View style={styles.userProfile} >
          <TouchableWithoutFeedback onPress={this._showMainPic.bind(this)}>
            <Image
                style={styles.icon}
                source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}   
            />      
          </TouchableWithoutFeedback>
          <Text>{ this.props.fullName }</Text>
          <Text>{ this.props.email }</Text>
          <Text>{ this.props.phone }</Text>
        </View>      
    );
  }  
  
  _showMainPic() {
    // open a modal with main picture in full size
    console.log('show main pic');
  }
}

// define PropTypes

const styles = StyleSheet.create({
  userProfile: {
    margin: 2,
    backgroundColor:'#bbaa99',
    width:300,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20, 
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 1,   
    flexDirection:'row',
  },
  icon: {
    width: 40, 
    height: 40,
    marginRight:30,
  }  
});



