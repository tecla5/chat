'use strict';

import React, {
  Component,
  ListView
} from 'react-native';

export default class List extends Component {
  constructor(props){
    super(props);
  }

  _dataSource() {
    return new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
}
