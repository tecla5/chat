import codePush from 'react-native-code-push';

import React, {
    Component,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import Button from 'react-native-button';


import Container from './Container';
import NewChat from './NewChat';

//import Firebase from 'firebase';
import Rebase from 're-base';


let base = Rebase.createClass('https://t5-chat.firebaseio.com/');

export default class T5Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount(params) {
        console.log('componentDidMount ', params);
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.INMEDIATE
        }, function (status) {
            console.log('codepush ', status);
        });
    }

    componentWillMount() {
        console.log('componentWillMount');
        /*
         * Here we call 'bindToState', which will update
         * our local 'messages' state whenever our 'chats'
         * Firebase endpoint changes.
         */
        base.bindToState('chats', {
            context: this,
            state: 'messages',
            asArray: true
        });

    }

    render() {
        return (
            <View style={ styles.container } >
                <Text>T5 Chat 2</Text>
                <NewChat chats={ this.state.messages } />
                < Container />
            </View>            
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
