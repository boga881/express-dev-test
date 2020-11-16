import React, { Component } from 'react';
import moment from 'moment';

export default class convertTimestamp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { timestamp, format } = this.props;
    const converted = moment(timestamp,'x').format(format);

    return(
      <React.Fragment>
        {converted}
      </React.Fragment>
    );
  }

}
