import React, { Component } from 'react';
//import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import { getSettings, updateSettings } from 'actions/settings';
//import UserLocation from 'Components/UserLocation';
//import * as clientConfig from 'Utils/client-config';
import config from 'root/icup.config.json';
import { Switch, TextInput, Row, Col } from 'react-materialize';
import { forEach } from 'lodash'

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

   _.forEach(config.VALVES, function(value) {
     console.log(value);
   });

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

  /*componentWillReceiveProps(nextProps) {
    if (nextProps.initialized && !nextProps.updating) {
      this.setStateFromProps(nextProps);
    }
  }*/

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
    const status = !this.state.valve
    console.log(id + ':' + status);
    /*
    this.setState({
      [valve]: [status]
    });
    */
  }

  inputChange = (id) => {
    //TODO:  Update config.
    const status = !this.state.valve
    console.log(`input change: ${id}`);
  }

  render() {
    //const { isLoading, checkWeather } = this.state;
    const valve_id = 'VALVE_ONE';
    const checked = true;
    const valves = config.VALVES;
    /*console.log(`VALVES:`);
    console.log(JSON.stringify(valves));
    console.log('Checked: '  + checked);
    console.log('valve render');
    console.log('valve status:');
    console.log(config[valve_id]);
*/
    const opt = Object.keys(valves).map(key =>
      <div className={`CONTAINER_${key}`}>
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
            label={`Valve ${valves[key].POSITION} GPIO pin`}
            onChange={function inputChange(key){}}
            placeholder="GPIO Pin#"
            className="validate"
            value={valves[key].GPIO}
            disabled={valves[key].ENABLED ? false : true}
          />
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {opt}
      </React.Fragment>
    );
  }

}

export default connect()(Valves);
