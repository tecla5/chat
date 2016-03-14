 

import React, {
  Component,
  ListView,
  StyleSheet,
  Text
} from 'react-native';

export default class Conversations extends Component {            
    constructor() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(['a','b']),
        };
    }
       
    _handlePress() {
        this.props.navigator.push({id: 'chat',});
    }
      
    _renderRow(data){
        return (<Text 
        onPress={this._handlePress}
        >{data}</Text>);
    }
    
    render(){
        return (
          <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderRow}
          //style={styles.separator}
          />
        );
    }
}
