import React, { Component } from 'react';
//import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import { getSettings, updateSettings } from 'actions/settings';
//import UserLocation from 'Components/UserLocation';
//import * as clientConfig from 'Utils/client-config';
import config from 'root/icup.config.json';
import { Switch, Row, Col } from 'react-materialize';

class Valves extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shutoffDuration: 0,




    };
  }

  componentDidMount() {
   console.log('THE CONFIG: ');
   console.log(JSON.stringify(config));
   console.log(config.VALVE_ONE);

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
    {/* eslint no-undef:0
    M.updateTextFields(); */}
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

  switchChange = (id) => {
    //TODO:  Update config.
    const valve = `valve_${id}`
    const status = !this.state.valve
    console.log(valve + ':' + status);
    /*
    this.setState({
      [valve]: [status]
    });
    */
  }

  render() {
    //const { isLoading, checkWeather } = this.state;
    const valve_id = 'VALVE_ONE';
    const checked = true;
    console.log('Checked: '  + checked);
    console.log('valve render');
    console.log('valve status:');
    console.log(config[valve_id]);

    return(
      <React.Fragment>
        <div className='row'>
          <div>{`Valve ${valve_id}`}</div>
          <div className='input-field col s6'>
            <Switch
              id={valve_id}
              offLabel="Disabled"
              onChange={function switchChange(valve_id){}}
              onLabel="Enabled"
              checked={config[valve_id]}
            />
          </div>

          <div className='input-field col s6'>
            <input placeholder="GPIO Pin#" id={`valve_${valve_id}`} type="text" class="validate" value={config.VALVE_ONE} disabled={[this.state.valve_id] ? '' : 'disabled'} />
            <label for={`valve_${valve_id}`}>{`Valve ${valve_id}`}</label>
          </div>

        </div>
      </React.Fragment>
    );
  }

}

export default connect()(Valves);
