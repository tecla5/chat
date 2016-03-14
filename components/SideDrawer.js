import React, { 
  Text, 
  View, 
  Component, 
  PropTypes 
} from 'react-native';

import Drawer from 'react-native-drawer';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

// Taken from: https://github.com/efkan/rndrawer-implemented-rnrouter
 
//  https://github.com/root-two/react-native-drawer
//  https://github.com/react-native-fellowship/react-native-side-menu

class SideDrawerContent extends Component {
	render() {
		const { drawer } = this.context;
		return (
			<View>
				<Button onPress={() => { Actions.drawer(); } }>Home</Button>
				<Button onPress={() => { Actions.rooms(); drawer.close(); } }>Rooms</Button>
				<Button onPress={() => { Actions.contacts(); drawer.close(); } }>Contacts</Button>
				<Button onPress={() => { Actions.login(); } }>Logout</Button>
			</View>
		);
	}
}

export default class SideDrawer extends Component {

  render() {
    return (
			<Drawer
        type="overlay"
        content={<SideDrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
				styles={drawerStyles}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    )
  }

}

SideDrawerContent.contextTypes = {
  drawer: PropTypes.object.isRequired,
};

var drawerStyles = {
	drawer: { backgroundColor: '#ffffff' },
	main: { paddingLeft: 3 }
};
