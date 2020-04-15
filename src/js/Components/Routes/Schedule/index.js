import React, { Component } from 'react';
import { getHistory } from 'actions/history.js'
import moment from 'moment';
import Loading from 'components/Loading';
import ScheduleModal from 'components/Routes/Schedule/scheduleModal.js';
import { Button, Col, Icon, Select, TextInput, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class ScheduleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: null,
      isLoading: true,
    };
  }

  getHistory = async () => {
    const dan = true;
    // const result = await getHistory()
    //
    // if (typeof result !== 'undefined' && result.success) {
    //   const historyList = result.message.history;
    //   let historySorted = Object.keys(historyList).map(key => historyList[key]);
    //   historySorted.sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));
    //
    //   this.setState({
    //     history: historySorted,
    //     isLoading: false,
    //   });
    // }
  }

  componentDidMount() {
    //const history = this.getHistory();
  }

  handleSchedule = (data) => {
    console.log(JSON.stringify(data));
  }


  render() {
    const { history, isLoading } = this.state;


    return(
      <Row>
        <Col s={12}>
          <h3>Schedule</h3>
          <p>You current schedules are listed below. New schedules can be added using the add button.</p>

          <ScheduleModal onScheduleChange={this.handleSchedule} buttonTitle={"Add"} modalId={"schedule-add"}/>



        </Col>
      </Row>
    );
  }

}
