import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSchedules, updateSchedule, removeSchedule } from 'actions/schedule.js'
import { getSettings } from 'actions/settings.js'
import Loading from 'components/Loading';
import ScheduleModal from 'components/Routes/Schedule/scheduleModal.js';
import { Button, Card, Col, Icon, Select, TextInput, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';
import {isEmpty} from 'lodash';

export default class ScheduleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //history: null,
      isLoading: true,
      schedules: null,
      valveList: null,
      valveListEmpty: true
    };
  }

  componentDidMount() {
    const valves = this.getValveList();
    const schedules = this.getSchedulesFromConfig();
  }

  getValveList = async () => {
    const result = await getSettings()

    if (typeof result !== 'undefined' && result.success) {
      const valveList = result.message.settings.valves.list;
      this.setState({
        valveListEmpty: Object.keys(valveList).length === 0,
        valveList: valveList
      });
    }
  }

  getSchedulesFromConfig = async () => {
    const result = await getSchedules();

    if (typeof result !== 'undefined' && result.success) {
      console.log(JSON.stringify(result.message));
      this.setState({
        schedules: result.message.schedule,
        isLoading: false,
      });
    }
  }

  updateScheduleToConfig = async (data, type) => {
    if (type === 'remove') {
      const remove = await removeSchedule(data);
    } else if (type === 'update') {
      const update = await updateSchedule(data);
    }

    const schedules = this.getSchedulesFromConfig();
  }

  doUpdateSchedule(event, type) {
    // this.setState({
    //   isLoading: true,
    // });

    let data = event
    if (type === 'remove') {
      data = event.target.id;
    }
    const promise = this.updateScheduleToConfig(data, type);
  }

  render() {
    const { history, isLoading, valveList, valveListEmpty, schedules } = this.state;

    if (!isLoading === null || valveList === null) {
      return (
        <Loading />
      );
    }

    return(
      <Row>
        <Col s={12}>
          <h3>Schedule</h3>
          <p>Your current schedules are listed below. New schedules can be added using the add button.</p>

          {valveListEmpty &&
            <Card
              actions={[
                <Link key="settings" to="/settings"><i className="material-icons left">settings</i>Settings</Link>
              ]}
              className="blue-grey darken-1"
              closeIcon={<Icon>close</Icon>}
              revealIcon={<Icon>more_vert</Icon>}
              textClassName="white-text"
              title="Ooops"
            >You need to configure your valve setup first before adding a schedule in settings.
            </Card>
          }

          { schedules !== null  &&
            <div>
              <ScheduleModal key={Math.random()} onScheduleChange={(e) => this.doUpdateSchedule(e, 'update')} buttonTitle={"Add"} buttonIcon={"playlist_add"} modalId={"schedule-add"} valveOptions={valveList}/>
              <table className="striped responsive-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start</th>
                    <th>Duration</th>
                    <th>Days</th>
                    <th>Zone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(schedules).map((key, i) => (
                    <tr key={key}>
                      <td>{schedules[key].name}</td>
                      <td>{schedules[key].start}</td>
                      <td>{schedules[key].duration}</td>
                      <td>{(schedules[key].days.join(", "))}</td>
                      <td>{schedules[key].valve}</td>
                      <td><ScheduleModal key={schedules[key].name} onScheduleChange={(e) => this.doUpdateSchedule(e, 'update')} buttonTitle={"Edit"}  buttonIcon={""} modalId={`schedule-edit-${key}`} valveOptions={valveList} vals={(schedules[key])} /></td>
                      <td><Button className="left red" id={(schedules[key].name)} onClick={(e) => this.doUpdateSchedule(e, 'remove')}>Delete</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          { schedules === null  &&
            <div>
              <ScheduleModal key={Math.random()} onScheduleChange={this.handleSchedule} buttonTitle={"Add"} buttonIcon={"playlist_add"} modalId={"schedule-add"} valveOptions={valveList}/>
            </div>
          }

        </Col>
      </Row>
    );
  }
}
