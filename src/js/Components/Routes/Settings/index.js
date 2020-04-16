import React, { Component } from 'react';
import { getSettings, updateSettings } from 'actions/settings.js'
import Loading from 'components/Loading';
import { Button, Checkbox, Col, Row, Select, Switch, TextInput } from 'react-materialize';
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
    //this.getUserConfigSettings = this.getUserConfigSettings.bind(this);
    //this.updateUserConfigSettings = this.updateUserConfigSettings.bind(this);
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
    const update = await updateSettings(newField, newValue)
    const get = await this.getUserConfigSettings()
  }

  componentDidMount() {
    const promise = this.getUserConfigSettings();
  }

  componentDidUpdate() {
    {/* eslint no-undef:0 */}
    M.updateTextFields();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.initialized && !nextProps.updating) {
  //     this.setStateFromProps(nextProps);
  //   }
  // }

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
    let promise = this.updateUserConfigSettings(path, value);
 }

  handleInputChange() {
    console.log('updating settings...');
  }

  selectChange(event){
    const newField = 'valves.defaultShutoffDuration';
    const newValue = event.target.value;
    let promise = this.updateUserConfigSettings(newField, newValue);
  }

  handleSwitchChange = async (id) => {
    const { userConfig } = this.state;
    const newField = `valves.${id}.enabled`;
    const configVal = eval(`userConfig.valves.${id}.enabled`);
    const newValue = !configVal;
    await this.updateUserConfigSettings(newField, newValue);
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
    const valves = userConfig.valves;

    const switches = Object.keys(valves).map(key =>
      <div key={key}>
        <div className={`TITLE_${key}`}>{`Valve ${valves[key].position}`}</div>
        <div className={`input-field col s6 SWITCH_${key}`}>
          <Switch
            id={`switch-${key}`}
            offLabel="Disabled"
            onClick={() => this.handleSwitchChange(key)}
            onLabel="Enabled"
            checked={valves[key].enabled}
          />
        </div>
        <div className={`input-field col s6 INPUT_${key}`}>
          <TextInput
            ref="selectFoo"
            label={`Valve ${valves[key].position} gpio pin`}
            onChange={function handleInputChange(key){}}
            placeholder="gpio Pin#"
            className="validate"
            defaultValue={valves[key].gpio}
            disabled={valves[key].enabled ? false : true}
          />
          <Button
            node="a"
            small
            onClick={this.handleClick}
            waves="light"
          >
          Save
          </Button>
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
                    label="Token"
                    onChange={this.handleInputChange}
                    placeholder="Pushover token"
                    defaultValue={pushover.token}
                    disabled={!pushoverEnabled}
                  />
                  <TextInput
                    s={12}
                    label="User Key"
                    onChange={function handleInputChange(){}}
                    placeholder="Pushover user key "
                    defaultValue={pushover.userKey}
                    disabled={!pushoverEnabled}
                  />
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                  <h5>Solonids</h5>
                  <p>Enable multiple valves and enter the corrisponding Raspberry Pi gpio pin.</p>
                  {switches}
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                <h5>Automatic valve shut off</h5>
                  <p>Switch off the valve after a set duration of time. This setting does not affect scheduled waterings.</p>
                  <Select options={dropdownOptions} onChange={this.selectChange} value={userConfig.valves.defaultShutoffDuration}>
                    <option value='0'>Disabled</option>
                    <option value='1'>1 Minute</option>
                    <option value='2'>2 Minutes</option>
                    <option value='5'>5 Minutes</option>
                    <option value='10'>10 Minutes</option>
                    <option value='15'>15 Minutes</option>
                    <option value='30'>30 Minutes</option>
                    <option value='60'>60 Minutes</option>
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
