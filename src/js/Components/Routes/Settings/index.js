import React, { Component } from 'react';
import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import { getSettings, updateSettings } from 'Actions/settings';
import Loading from 'Components/Loading';
import UserLocation from 'Components/UserLocation';
import * as clientConfig from 'Utils/client-config';

class SettingsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shutoffDuration: 0,
      location: null,
      checkWeather: false,
      //intialized: this.props.initialized ? this.props.initialized : false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    // if (!this.state.initialized) {
    //   this.props.dispatch(getSettings());
    // } else {
    //   this.setStateFromProps(this.props);
    // }
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

  render() {
    const { isLoading, checkWeather } = this.state;

    return(
      <React.Fragment>
        {isLoading &&
          <Loading />
        }

        {!isLoading &&
          <div className='row'>
            <h3>Settings</h3>
            <form className='col s12'>
              <div className='row'>
                <div className='col s12'>
                  <p>The 8 digit Pin code required to register this device with Apple HomeKit.</p>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <label htmlFor="homekit-pin">HomeKit Pin</label>
                  <input value={clientConfig.HOMEKIT_PINCODE} readOnly={true} id="homekit-pin" type="text" />
                </div>
              </div>
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
                    <UserLocation location={this.state.location} onChange={this.handleChangeLocation} />
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
