import React, { Component } from 'react';
import { Button, Col, Row, Switch, TextInput } from 'react-materialize';
import { getSettings, updateSettings } from 'actions/settings.js'
import Loading from 'components/Loading';
import ToHumanDate from 'utils/convertTimestamp.js';
import Countdown from "react-countdown";

export default class Main extends Component  {

    constructor(props) {
      super(props);
      this.state = {
        userConfig: null,
        isLoading: true,
        valveList: null,
        valveListEmpty: true
      };
    }

    componentDidMount() {
      const promise = this.getUserConfigSettings();
    }

    getUserConfigSettings = async () => {
      const result = await getSettings()

      if (typeof result !== 'undefined' && result.success) {
        const settings = result.message.settings;
        this.setState({
          userConfig: settings,
          isLoading: false,
        });
      }
    }

    updateUserConfigSettings = async (newField, newValue) => {
      //const update = await updateSettings(newField, newValue);
      //const get = await this.getUserConfigSettings();
      return fetch(updateSettings(newField, newValue))
        .then(response => {
          this.getUserConfigSettings();
        })
        .catch( error => console.log(error));
    }

    toggleValveAction = async (event) => {
      const field = event.target.name;
      const newValue = event.target.value;


      this.updateUserConfigSettings(field, newValue);
      //
      // // If opeining valve, replace field and update config again.
      // if (newValue) {
      //   const update = await updateSettings(field, newValue);
      //   const fieldTimestamp = field.replace("isOpen", "timeStated");
      //   this.updateUserConfigSettings(fieldTimestamp, Date.now());
      //   console.log("time" + Date.now());
      // }
      // else {
      //   this.updateUserConfigSettings(field, newValue);
      // }

    }

    render() {
      const { userConfig, isLoading, dropdownOptions } = this.state;

      if (userConfig === null) {
        return (
          <React.Fragment>
              <Loading />
          </React.Fragment>
        );
      }

      const duration = userConfig.valves.defaultShutoffDuration;
      const pushover = userConfig ? userConfig.notifications.pushover : false;
      const pushoverEnabled = userConfig.notifications.pushover.enabled;
      const valves = userConfig.valves.list;

      const switches = Object.keys(valves).map(key => {
        if (!valves[key].enabled) {
          return <tr key={key} className={key}></tr>
        } else if (valves[key].enabled && !valves[key].status.isOpen) {
          return <tr key={key}>
              <td>OFF</td>
              <td>-</td>
              <td>-</td>
              <td>{valves[key].position}</td>
              <td>
                <Button
                  className="green"
                  name={`valves.list.${key}.status.isOpen`}
                  value={!valves[key].status.isOpen}
                  onClick={this.toggleValveAction}
                  waves="light">START</Button>
              </td>
            </tr>
        } else if (valves[key].enabled && valves[key].status.isOpen) {
          return <tr key={key}>
              <td>ON</td>
              <td><ToHumanDate timestamp={valves[key].status.timeStated} format='HH:mm:ss' /></td>
              <td><Countdown date={Date.now() + userConfig.defaultShutoffDuration} daysInHours={true}/></td>
              <td>{valves[key].position}</td>
              <td>
              <Button
                className="red"
                name={`valves.list.${key}.status.isOpen`}
                value={!valves[key].status.isOpen}
                onClick={this.toggleValveAction}
                waves="light">STOP</Button>
              </td>
            </tr>
        }
      });

      return (
        <Row>
          <Col s={12}>
            <h5>Quick Run</h5>
            <p>Turn on your configured solonids to run for the current default duration of <b>{duration} minutes</b>.</p>
              <table className="striped responsive-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Started</th>
                    <th>Ending </th>
                    <th>Zone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {switches}
                </tbody>
              </table>

            <p>TODO items</p>
            <ul>
              <li>Weather</li>
              <li>Turn on single valve</li>
              <li>rain fall in area</li>
            </ul>
          </Col>
        </Row>

      );
    }
  }
