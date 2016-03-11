const React = require('react-native');
const {
    ListView,
    StyleSheet,
    Text
} = React;

module.exports = React.createClass({
    
        
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(['a','b']),
        };
    },
    
   
    _handlePress() {
        this.props.navigator.push({id: 'chat',});
    },
      
    _renderRow: function (data){
        return (<Text 
        onPress={this._handlePress}
        >{data}</Text>);
    },
    
    render: function(){
        return (
          <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderRow}
          //style={styles.separator}
          />
        );
    }
});


/*

*/