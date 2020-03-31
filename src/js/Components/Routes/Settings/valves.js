import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, updateSettings } from 'actions/settings';
//import clientConfig from 'root/src/js/server/user.config.json';
import { Switch, TextInput, Button } from 'react-materialize';

class Valves extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shutoffDuration: 0,
    };

     this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
   console.log('THE CONFIG: ');
   console.log(JSON.stringify(clientConfig));

  }

  componentDidUpdate() {
    {/* eslint no-undef:0 */}
    M.updateTextFields();
    console.log('DID UPDATE: ');
  }

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECEIVE PROPS: ');
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

  handleSwitchChange = (id) => {
    //TODO:  Update config.
    const status = !this.state.valve
    console.log(id + ':' + status);
    /*
    this.setState({
      [valve]: [status]
    });
    */
  }

  handleInputChange = (id) => {
    //TODO:  Update config.
    console.log(`input change: ${id}`);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    const valves = clientConfig.VALVES;
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

    return (
      <React.Fragment>
        {switches}
      </React.Fragment>
    );
  }

}

export default connect()(Valves);
