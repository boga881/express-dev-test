import React, { Component } from 'react';
import { getSettings, updateSettings } from 'actions/settings.js'
import Loading from 'components/Loading';
import { Button, Checkbox, Col, Row, Switch, TextInput } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class SettingsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userConfig: null,
      isLoading: true,
      logging: 'No Logging',
      tabSettings: {
        duration: 300,
        onShow: null,
        responsiveThreshold: Infinity,
        swipeable: false
      },
      shutoffDuration: 0,
      location: null,
      checkWeather: false

    };

    this.selectChange = this.selectChange.bind(this);
    this.getUserConfigSettings = this.getUserConfigSettings.bind(this);
    this.updateUserConfigSettings = this.updateUserConfigSettings.bind(this);
  }

  async getUserConfigSettings() {
    // @TODO remove Promise.all function
    let configData = await Promise.all([getSettings()]);

    if (configData[0].success) {
      const settings = configData[0].message.settings;
      this.setState({
        userConfig: settings,
        isLoading: false,
      })
    }
  }

  async updateUserConfigSettings(newField, newValue) {
    // @TODO remove Promise.all function
    let promise = await Promise.all([updateSettings(newField, newValue)]);
    let newData = this.getUserConfigSettings();
  }

  componentDidMount() {
    let promise = this.getUserConfigSettings();
  }

  componentDidUpdate() {
    {/* eslint no-undef:0 */}
    M.updateTextFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialized && !nextProps.updating) {
      this.setStateFromProps(nextProps);
    }
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
    let promise = this.updateUserConfigSettings(path, value);
 }

  handleInputChange() {
    console.log('updating settings...');
  }

  selectChange(event){
    const newField = 'VALVES.defaultShutoffDuration';
    const newValue = event.target.value;
    let promise = this.updateUserConfigSettings(newField, newValue);
  }


  render() {
    const { userConfig, isLoading, checkWeather, tabSettings } = this.state;
    {/*const pushover = clientConfig.notifications.pushover;*/}

    const pushover = userConfig ? userConfig.notifications.pushover : false;

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


    const pushoverEnabled = userConfig.notifications.pushover.enabled;
    console.log(JSON.stringify('pushoverEnabled: ' + pushoverEnabled));

    const valves = userConfig.VALVES;
    const switches = Object.keys(valves).map(key =>
      <div key={key}>
        <div className={`TITLE_${key}`}>{`Valve ${valves[key].POSITION}`}</div>
        <div className={`input-field col s6 SWITCH_${key}`}>
          <Switch
            offLabel="Disabled"
            onChange={function switchChange(key){}}
            onLabel="Enabled"
            checked={valves[key].ENABLED}
          />
        </div>
        <div className={`input-field col s6 INPUT_${key}`}>
          <TextInput
            ref="selectFoo"
            label={`Valve ${valves[key].POSITION} GPIO pin`}
            onChange={function handleInputChange(key){}}
            placeholder="GPIO Pin#"
            className="validate"
            defaultValue={valves[key].GPIO}
            disabled={valves[key].ENABLED ? false : true}
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
                  <p>Enable multiple valves and their corrisponding GPIO pin using the configuration.</p>
                  {switches}
                </Col>
              </Row>
              <Row>
                <Col s={12}>
                <h5>Automatic valve shut off</h5>
                  <p>Switch off the valve after a set duration of time. This setting does not affect scheduled waterings.</p>
                  <label>Automatic valve shut-off</label>
                  <select ref='shutoffDuration' className='browser-default' onChange={this.selectChange} value={userConfig.VALVES.defaultShutoffDuration}>
                    <option value='0'>Disabled</option>
                    <option value='1'>1 Minute</option>
                    <option value='2'>2 Minutes</option>
                    <option value='5'>5 Minutes</option>
                    <option value='10'>10 Minutes</option>
                    <option value='15'>15 Minutes</option>
                    <option value='30'>30 Minutes</option>
                    <option value='60'>60 Minutes</option>
                  </select>
                </Col>
              </Row>
            </form>
          </div>
        }
      </React.Fragment>
    );
  }

}
