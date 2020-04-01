import React from 'react';
const superagent = require('superagent');
import { getSettings, updateSettings } from 'actions/settings.js'
import { isEmpty } from 'lodash';
import Loading from 'components/Loading';
//import clientConfig from 'root/src/js/server/user.config.json';


export default class Button extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        userConfig: null,
        logging: 'No Logging',
        solenoid: 'false'
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.selectChange = this.selectChange.bind(this);
      this.getUserConfigSettings = this.getUserConfigSettings.bind(this);
      this.updateUserConfigSettings = this.updateUserConfigSettings.bind(this);
  }

  async getUserConfigSettings() {
    // @TODO remove Promise.all function
    let configData = await Promise.all([getSettings()]);

    if (configData[0].success) {
      const settings = configData[0].message.settings;
      console.log('------> Got Settings <------');
      console.log(settings);
      this.setState({ userConfig: settings })
    }
  }

  async updateUserConfigSettings(newField, newValue) {
    // @TODO remove Promise.all function
    let newData = await Promise.all([updateSettings(newField, newValue, true)]);
    if (newData.success) {
      // update the state with new user config.
    }



  }

  componentDidMount() {
    let promise = this.getUserConfigSettings();
  }

  handleChange(event) {
    this.setState({
	     value: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault;
    console.log('The button was clicked: ' + this.state.solenoid);
    let endpoint = '';

    if (this.state.solenoid) {
	     endpoint = 'relayoff';
    } else {
	     endpoint = 'relayon';
    }

    this.setState({
      solenoid: !this.state.solenoid
    });
    //aydm8izeric3yof2bqhut994zpfevu
    (async () => {
      try {
        const res = await superagent.post('/api/'+ endpoint).send({ name: 'Dan', species: 'cool' });
        console.log('ENDPOINT: ' + endpoint);
        console.log(res);
        this.setState({logging: JSON.stringify(res.body)});
      } catch (err) {
        console.error(err);
      }
    })();

    // Pushover notification
  /*  (async () => {
      try {
        const res = await superagent
        .post('https://api.pushover.net/1/messages.json')
        .send({
        	"token": "aydm8izeric3yof2bqhut994zpfevu",
        	"user": "up5PLmNmgVho9gogJpqHXnd4RUNi9v",
        	"title": "ICUP",
        	"message": "Testing"
        })
        .set('Content-Type', 'application/json')
      } catch (err) {
        console.error(err);
      }
    })();
*/

    /*    return dispatch => {
            dispatch({
                type: 'TOGGLE_VALVE_START'
            })
            return superagent
                .post('/api/1/toggle-valve')
                .type('json')
                .accept('json')
                .end()
                .then(res => {
                    res.body.type = 'TOGGLE_VALVE_FINISH';
                    dispatch(res.body);
                })
                .catch(err => {
                    dispatch({
                        type: 'TOGGLE_VALVE_FINISH',
                        success: false
                    });
                    dispatch(apiError(err));
                });
        };
        this.setState(state => ({
              logging: dispatch
            }));*/

  }

//https://stackoverflow.com/questions/53186430/react-wait-for-server-response
  selectChange(event){
    const newField = 'VALVES.defaultShutoffDuration';
    const newValue = event.target.value;
    let promise = this.updateUserConfigSettings(newField, newValue);
    //updateSettings(newField, newValue);
    //let promise = this.getUserConfigSettings();
    //this.setState({userConfig: newConfig);

  }

  render() {
    const { userConfig } = this.state;
    console.log("--- userConfig ----");
    console.log(JSON.stringify(userConfig));

    if (userConfig === null) {
      return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className='button'>
          <button onClick={this.handleClick}>Click Me</button>
          <br />
          <textarea onChange={this.handleChange} className='text' rows="4" cols="50" value={this.state.logging} />
          <br/>
          <div className='row'>
            <div className='col s12'>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
