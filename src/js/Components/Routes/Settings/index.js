import React, { Component } from 'react';
import { getSettings, updateSettings } from 'actions/settings.js'
import Loading from 'components/Loading';
import { Button, Checkbox, Col, Row, Select, Switch, TextInput } from 'react-materialize';
import { calcTimeDelta } from 'react-countdown';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class SettingsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userConfig: null,
      isLoading: true,
      dropdownOptions: {
        browserDefault: false,
        label: "Automatic valve shut-off"
      },
      shutoffDuration: 0

    };

    this.selectChange = this.selectChange.bind(this);
    // this.updateUserConfigSettings = this.updateUserConfigSettings.bind(this);

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

  updateUserConfigSettings = async (newField, newValue, id = {}) => {
    return fetch(updateSettings(newField, newValue ,id))
        .then(response => {
          this.getUserConfigSettings();
        })
        .catch( error => console.log(error));
  }


  componentDidMount() {
    const promise = this.getUserConfigSettings();
  }

  componentDidUpdate() {
    {/* eslint no-undef:0 */}
    M.updateTextFields();
  }

  setStateFromProps(props) {
    this.setState({
      shutoffDuration: props.settings.shutoffDuration,
      location: props.settings.location,
      checkWeather: !!props.settings.location
    });
  }

  handleChangeShutoffDuration = (e) => {
    const newState = {
      shutoffDuration: parseInt(e.target.value)
    };
    this.setState(newState);
    this.props.dispatch(updateSettings(newState));
  }

  handleCheckWeather = (e) => {
    this.setState({
      checkWeather: e.target.checked
    });
    if (!e.target.checked) {
      this.props.dispatch(updateSettings({
        location: null
      }));
    }
  }

  handleChangeLocation = (loc) => {
    const newState = {
      location: loc
    };
    this.setState(newState);
    this.props.dispatch(updateSettings(newState));
  }

  handleRefreshLocation = () => {
    this.setState({
      location: null
    });
  }

  handleCheckboxChange(event, e) {
    const { userConfig } = this.state;
    const pushoverEnabled = userConfig.notifications.pushover.enabled;
    const status = !pushoverEnabled;

    const path = 'notifications.pushover.enabled';
    const value = status;
    console.log(`Checkbox status: ${status}`);
    this.updateUserConfigSettings(path, value);
 }

  handleInputChange(e) {
    const path = e.target.name;
    const value = e.target.value;

    console.log('updating settings...');
    console.log(`name: ${path}`);
    console.log(`val: ${value}`);

    this.updateUserConfigSettings(path, value);
  }

  selectChange(event){
    const field = event.target.name;
    const newValue = parseInt(event.target.value);
    this.updateUserConfigSettings(field, newValue);
  }

  handleSwitchChange = async (id) => {
    const { userConfig } = this.state;
    const newField = `valves.list.${id}.enabled`;
    const configVal = eval(`userConfig.valves.list.${id}.enabled`);
    const newValue = !configVal;
    await this.updateUserConfigSettings(newField, newValue);
    console.log("Done: HandleSwitchChange");
  }

  render() {
    const { userConfig, isLoading, dropdownOptions } = this.state;


    if (devServerEnabled) {
      console.group("--- userConfig ----");
      console.log(JSON.stringify(userConfig));
      console.groupEnd();
    }

    if (userConfig === null) {
      return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
      );
    }

    const pushover = userConfig ? userConfig.notifications.pushover : false;
    const pushoverEnabled = userConfig.notifications.pushover.enabled;
    const valves = userConfig.valves.list;
    const gpioPins = userConfig.gpio.pins;

    let optKey = 1;
    let valueGPIOList = [];
    for (let i = 1; i <= gpioPins; i++) {
        valueGPIOList.push(<option key={optKey++} value={i}>{i}</option>)
    }

    const switches = Object.keys(valves).map(key =>
      <div key={key} className='user-settings'>
        <div className={`TITLE_${key} col s12`}>{`Valve ${valves[key].position}`}</div>
        <TextInput
          s={5}
          key={key}
          name={`valves.list.${key}.name`}
          className='user-settings__zone-name'
          label="Zone Name"
          onChange={(e) => this.handleInputChange(e)}
          placeholder="User friendly name"
          defaultValue={valves[key].name}
        />
        <div className={`input-field col s3 INPUT_${key}`}>
          <Select
            name={`valves.list.${key}.gpio`}
            label={`Valve ${valves[key].position} gpio pin`}
            disabled={!valves[key].enabled}
            onChange={this.selectChange}
            value={valves[key].gpio}
          >
            {valueGPIOList}
          </Select>
        </div>
        <div className={`input-field col s4 SWITCH_${key}`}>
          <Switch
            id={`switch-${key}`}
            offLabel="Disabled"
            onClick={() => this.handleSwitchChange(key)}
            onLabel="Enabled"
            checked={valves[key].enabled}
          />
        </div>
      </div>
    );

    return(
      <React.Fragment>

        {!isLoading &&
          <div className='row'>
            <h3>Settings</h3>
            <form className='col s12'>
              <Row>
                <Col s={12}>
                  <h5>Notifications</h5>
                  <p>Get push notifications on your device when events are triggered.</p>
                  <Checkbox
                    id="pushover_status"
                    label="Use Pushover"
                    value="pushover"
                    onChange={(e) => this.handleCheckboxChange({pushoverEnabled}, e)}
                    checked={pushoverEnabled}
                  />
                  <TextInput
                    s={12}
                    name={`notifications.pushover.token`}
                    label="Token"
                    onChange={(e) => this.handleInputChange(e)}
                    placeholder="Pushover token"
                    defaultValue={pushover.token}
                    disabled={!pushoverEnabled}
                  />
                  <TextInput
                    s={12}
                    name={`notifications.pushover.userKey`}
                    label="User Key"
                    onChange={(e) => this.handleInputChange(e)}
                    placeholder="Pushover user key "
                    defaultValue={pushover.userKey}
                    disabled={!pushoverEnabled}
                  />
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                  <h5>Solonids</h5>
                  <p>Enable multiple valves and enter the corrisponding RaspberryPi gpio pin.</p>
                  {switches}
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                <h5>Automatic valve shut off</h5>
                  <p>Switch off the valve after a set duration of time. This setting does not affect scheduled waterings.</p>
                  <Select
                    options={dropdownOptions}
                    onChange={this.selectChange}
                    value={`${userConfig.valves.defaultShutoffDuration}`}
                    name="valves.defaultShutoffDuration"
                  >
                    {/* <option key={0} value={0}>Disabled</option> */}
                    <option key={60000} value={60000}>1 Minute</option>
                    <option key={120000} value={120000}>2 Minutes</option>
                    <option key={300000} value={300000}>5 Minutes</option>
                    <option key={600000} value={600000}>10 Minutes</option>
                    <option key={900000} value={900000}>15 Minutes</option>
                    <option key={1800000} value={1800000}>30 Minutes</option>
                    <option key={3600000} value={3600000}>60 Minutes</option>
                  </Select>
                </Col>
              </Row>
            </form>
          </div>
        }
      </React.Fragment>
    );
  }

}
