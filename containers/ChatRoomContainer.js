import React, {
Component,
View,
Text,
StyleSheet,
InteractionManager
} from 'react-native';


import {sliceList} from '../utils';
// import FirebaseContainer from './FirebaseContainer';

import ChatRoom from '../components/room/ChatRoom';


import Rebase from 're-base';
let base = Rebase.createClass('https://t5-chat.firebaseio.com');


// number of messages to display as latest (how many messages appear initially in ListView)
const constants = {
    showMessageCount: 10
};

type MessageType = {
    text: string;
    name: string;
    image:?Object;
    position:?string;
    date: Date;
    view:?any;
    isOld: boolean;
}


export default class ChatRoomContainer extends Component {

    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
            renderPlaceholderOnly: true,
            user: null,
            contact: null,
            messages: [],
            message: null,
            show: null, // ??    
        };

    }

    get endpoint() {
        var id1 = (this.props.user) ? this.props.user.id : 'R1';
        var id2 = (this.props.contact) ? this.props.contact.id : 'R2';
        var roomId = 'messages/' + id1 + '_' + id2;
        return roomId;
    }


    componentWillMount() {

        this.state = {
            user: this.props.user,
            contact: this.props.contact,
            messages: [],
            message: null,
            show: null, // ??    
        };

        console.log(this.endpoint);
        this.ref = base.syncState(this.endpoint, {
            context: this,
            state: 'messages',
            asArray: true
        });

    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
            <View style={ styles.container } >
            <ChatRoom {...this.state } />  
            </View>                  
    );
    }

    _renderPlaceholderView() {
        return (
            <View>
            <Text>Loading...</Text>
            < /View>
    );
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderPlaceholderOnly: false });
        });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'green',
    }
});


// Make adapter and container available for child components
ChatRoomContainer.childContextTypes = {
    adapter: React.PropTypes.object,
    container: React.PropTypes.object
}
