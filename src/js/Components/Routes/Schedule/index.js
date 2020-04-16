import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from 'actions/history.js'
import { getSettings } from 'actions/settings.js'
import moment from 'moment';
import Loading from 'components/Loading';
import ScheduleModal from 'components/Routes/Schedule/scheduleModal.js';
import { Button, Card, Col, Icon, Select, TextInput, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';
import {isEmpty} from 'lodash';

export default class ScheduleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: null,
      isLoading: true,
      valveList: null,
      valveListEmpty: true
    };
  }

  componentDidMount() {
    const valves = this.getValveList();
  }

  getValveList = async () => {
    const result = await getSettings()

    if (typeof result !== 'undefined' && result.success) {
      const valveList = result.message.settings.valves.list;
      this.setState({
        valveListEmpty: Object.keys(valveList).length === 0,
        valveList: valveList,
        isLoading: false,
      });
    }
  }

  handleSchedule = (data) => {
    console.log(JSON.stringify(data));
  }


  render() {
    const { history, isLoading, valveList, valveListEmpty } = this.state;

    if (!isLoading === null) {
      return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
      );
    }

    return(
      <Row>
        <Col s={12}>
          <h3>Schedule</h3>
          <p>You current schedules are listed below. New schedules can be added using the add button.</p>

          {valveListEmpty &&
            <Card
              actions={[
                <Link to="/settings"><i className="material-icons left">settings</i>Settings</Link>
              ]}
              className="blue-grey darken-1"
              closeIcon={<Icon>close</Icon>}
              revealIcon={<Icon>more_vert</Icon>}
              textClassName="white-text"
              title="Opps"
            >You need to configure your valve setup first before adding a schedule in settings.
            </Card>

          }

          {!valveListEmpty &&
            <ScheduleModal onScheduleChange={this.handleSchedule} buttonTitle={"Add"} modalId={"schedule-add"} valveOptions={valveList}/>
          }
        </Col>
      </Row>
    );
  }

}
