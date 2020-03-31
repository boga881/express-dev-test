import React, { Component } from 'react';
//import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import { getSettings, updateSettings } from 'actions/settings';
import Loading from 'components/Loading';
import Valves from 'components/Routes/Settings/Valves';
//import UserLocation from 'Components/UserLocation';
//import * as clientConfig from 'Utils/client-config';
//import clientConfig from 'root/src/js/server/user.config.json';
import { Checkbox, TextInput, Row, Col } from 'react-materialize';

//let userConfig = require('root/src/js/server/user.config.json');

class SettingsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userConfig: {userConfig},
      pushoverEnabled: userConfig.notifications.pushover.enabled,
      tabSettings: {
        duration: 300,
        onShow: null,
        responsiveThreshold: Infinity,
        swipeable: false
      },
      shutoffDuration: 0,
      location: null,
      checkWeather: false,
      //intialized: this.props.initialized ? this.props.initialized : false,
      isLoading: true
    };

    //this.updateUserConfig = _.debounce(this.updateUserConfig, 1000);
  }

  componentDidMount() {
    console.log('did mount');
    console.log(userConfig);
    const newUserConfig = getSettings();
    console.log('settings retreived');
    /*console.log(JSON.stringify(userConfig.settings));*/
    this.setState({
      isLoading: false,
      userConfig: {newUserConfig}
    });
  }

  componentDidUpdate() {
    console.log('did update');
    userConfig = getSettings();
    console.log('settings updated');
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
    const { pushoverEnabled } = this.state;
    const status = !pushoverEnabled;

    //clientConfig.notifications.pushover.enabled = status;
    userConfig.notifications.pushover.enabled = status;

    const path = 'notifications.pushover.enabled';
    const value = status;
    console.log(clientConfig);
    console.log(`Checkbox status: ${status}`);
    this.setState({
      pushoverEnabled: status
    });
    updateSettings(path, value);
 }

  handleInputChange() {
    console.log('updating settings...');
  }


  render() {
    const { isLoading, checkWeather, tabSettings, pushoverEnabled } = this.state;
    {/*const pushover = clientConfig.notifications.pushover;*/}
    const pushover = userConfig ? userConfig.notifications.pushover : false;

    return(
      <React.Fragment>
        {isLoading &&
          <Loading />
        }

        {!isLoading &&
          <div className='row'>
            <h3>Settings</h3>
            <form className='col s12'>
              {/*<div className='row'>
                <div className='col s12'>
                  <p>The 8 digit Pin code required to register this device with Apple HomeKit.</p>
                </div>
              </div>*/}
              <Row>
                <Col s={12}>
                  <h5>Notifications</h5>
                  <p>Get notified when events are triggered.</p>
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
                  <Valves />
                </Col>
              </Row>

              {/*<div className='row'>
                <div className='input-field col s12'>
                  <label htmlFor="homekit-pin">HomeKit Pin</label>
                  <input value={clientConfig.HOMEKIT_PINCODE} readOnly={true} id="homekit-pin" type="text" />
                </div>
              </div>*/}
              <div className='row'>
                <div className='col s12'>
                  <p>Automatically switch off the valve after a set duration of time. This setting does not affect scheduled waterings.</p>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <label>Automatic valve shut-off</label>
                  <select ref='shutoffDuration' className='browser-default' value={this.state.shutoffDuration} onChange={this.handleChangeShutoffDuration}>
                    <option value='0'>Disabled</option>
                    <option value='1'>1 Minute</option>
                    <option value='2'>2 Minutes</option>
                    <option value='5'>5 Minutes</option>
                    <option value='10'>10 Minutes</option>
                    <option value='15'>15 Minutes</option>
                    <option value='30'>30 Minutes</option>
                    <option value='60'>60 Minutes</option>
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <p>Check the weather in your location and don't start scheduled waterings if it currently raining.</p>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <p>
                    <input type='checkbox' id='checkWeather' className='filled-in' onChange={this.handleCheckWeather} checked={this.state.checkWeather} />
                    <label htmlFor='checkWeather'>Check weather</label>

                    { checkWeather &&
                      <a className="waves-effect weather-btn btn-flat right" {...tapOrClick(this.handleRefreshLocation)}>
                        <i className='material-icons left'>refresh</i>
                        Refresh
                      </a>
                    }

                  </p>
                </div>
              </div>

              { checkWeather &&
                <div className='row'>
                  <div className='col s12'>
                {/*<UserLocation location={this.state.location} onChange={this.handleChangeLocation} />*/}
                  </div>
                </div>
              }
            </form>
          </div>
        }
      </React.Fragment>
    );
  }

}

export default connect()(SettingsComponent);
