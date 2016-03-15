import React, {
    View,
    Text,
    StyleSheet
} from 'react-native';

import moment from 'moment';

const isDate = (val) => {
  return val instanceof Date;  
}

import MessageBridge from './MessageBridge';

export default class MessageDate extends MessageBridge {
  constructor(props) {
    super(props);      
  }

  componentWillMount() {
    this.rowData = this.props.rowData;
    this.rowID = this.props.rowID;
    this.diffMessage = this._diffMessage();    
    this.showDate = isDate(this.rowData.date);  
    this.diff = this._calcDiff();     
  }

  _diffMessage() {
    return this.rowData.isOld === true ? this.getPreviousMessage(this.rowID) : this.getNextMessage(this.rowID);  
  }

  _canCalc() {
    return this.showDate && this.diffMessage && isDate(this.diffMessage.date)
  }

  _calcDiff() {
    return this._canCalc() ? moment(this.rowData.date).diff(moment(this.diffMessage.date), 'minutes') : 0;
  }

  _renderDate() {
      return (
          <Text style={[styles.date, this.props.styles.date]}>
              {moment(this.rowData.date).calendar()}
          </Text>
      );    
  }

  render() {    
    return this.showDate ? this._renderDate() : null;
  }
}

// access messenger
MessageDate.contextTypes = {
  // container: React.PropTypes.object,
  messenger: React.PropTypes.object
}      

const styles = StyleSheet.create({
    date: {
        color: '#aaaaaa',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
    }
});
