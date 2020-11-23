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

    generatePageId() {
      return Math.floor(Math.random() * 100);
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

    updateUserConfigSettings = async (newField, newValue, id) => {
      return fetch(updateSettings(newField, newValue ,id))
        .then(response => {
          this.getUserConfigSettings();
        })
        .catch( error => console.log(error));
    }

    toggleValveAction = async (event) => {
      const name = event.target.name
      const value = event.target.value;
      const id = event.target.id

      console.log(`toggleValveAction: ${value}`);
      console.log(`toggleValveName: ${name}`);
      if (value == "true") {
        this.updateUserConfigSettings(name, value, event.target.id);
      } else {
        console.log('Forcing valve shut off');
        this.updateUserConfigSettings(`valves.list.${id}.status.forceShutoff`, true, event.target.id);
      }
      
    }

    countdownRenderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        // @TODO: reload depricated, find better solution.
        window.location.reload(false);
      } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
      }
    };

    render() {
      const { userConfig, isLoading, dropdownOptions } = this.state;

      if (userConfig === null) {
        return (
          <React.Fragment>
              <Loading />
          </React.Fragment>
        );
      }

      const defaultDuration = userConfig.valves.defaultShutoffDuration;
      const pushover = userConfig ? userConfig.notifications.pushover : false;
      const pushoverEnabled = userConfig.notifications.pushover.enabled;
      const valves = userConfig.valves.list;

      const switches = Object.keys(valves).map(key => {
        if (!valves[key].enabled) {
          return <tr key={key} className={key}></tr>
        } else if (valves[key].enabled && !valves[key].status.isOpen) {
          return <tr key={key}>
              <td>OFF</td>
              <td>{valves[key].name}</td>
              <td>-</td>
              <td>-</td>
              <td>{valves[key].position}</td>
              <td>
                <Button
                  id={key}
                  className="green"
                  name={`valves.list.${key}.status.isOpen`}
                  value={!valves[key].status.isOpen}
                  onClick={this.toggleValveAction}
                  waves="light">START</Button>
              </td>
            </tr>
        } else if (valves[key].enabled && valves[key].status.isOpen) {
          let timeStarted = valves[key].status.timeStated;
          return <tr key={key}>
              <td>ON</td>
              <td>{valves[key].name}</td>
              <td><ToHumanDate timestamp={timeStarted} format={'HH:mm:ss'} /></td>
              <td><Countdown date={timeStarted + defaultDuration} daysInHours={true} renderer={this.countdownRenderer} zeroPadTime={3}/></td>
              <td>{valves[key].position}</td>
              <td>
              <Button
                id={key}
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
            <p>Turn on your configured solonids to run for the current default duration of <b><ToHumanDate timestamp={defaultDuration} format={'mm'} /> minutes</b>.</p>
              <table className="striped responsive-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Zone</th>
                    <th>Started</th>
                    <th>Ending </th>
                    <th>Valve</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {switches}
                </tbody>
              </table>

            <h5>TODO items</h5>
            <ul>
              <li>Stop cronjob if manually stopped valve</li>
              <li>Log history on manuall trigger</li>
            </ul> 
            <h5>Future items</h5>
            <ul> 
              <li>Homekit integration</li>
              <li>Weather</li>
              <li>Turn on single valve</li>
              <li>rain fall in area</li>
            </ul>
          </Col>
        </Row>

      );
    }
  }
