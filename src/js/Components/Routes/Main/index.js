import React, { Component } from 'react';
import { Button, Col, Row, Switch, TextInput } from 'react-materialize';
import { getSettings } from 'actions/settings.js'
import Loading from 'components/Loading';

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

    render() {
      const { userConfig, isLoading, dropdownOptions } = this.state;
      console.log(userConfig);
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
                <Button className="green" onClick={this.handleValveStart} waves="light">START</Button>
              </td>
            </tr>
        } else if (valves[key].enabled && valves[key].status.isOpen) {
          return <tr key={key}>
              <td>ON</td>
              <td>{valves[key].status.timeStated}</td>
              <td>-</td>
              <td>{valves[key].position}</td>
              <td>
              <Button
                className="red"
                onClick={this.handleValveStop}
                waves="light"
              >
              STOP
              </Button>
              </td>
            </tr>
        }
      });

      return (
        <Row>
          <Col s={12}>
            <h3>Home</h3>
            <h5>Quick Run</h5>
            <p>Turn on your configured solonids to run for the current default duration of {duration} minutes.</p>
              <table className="striped responsive-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
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
