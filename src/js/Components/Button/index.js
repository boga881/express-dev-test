import React from 'react';
const superagent = require('superagent');
import { getSettings, getSettingsNew, updateSettings } from 'actions/settings.js'
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
      //this.getUserConfigSettings = this.getUserConfigSettings.bind(this);
  }

  componentDidMount() {

    fetch('/api/settings')
      .then(data => data.json())
      .then(data => {
        console.log('-------return from fetch')
        console.log(data.settings)
        this.setState({ userConfig: data.settings })
      });

    // const data = fetch('/api/settings')
    //   .then(res =>
    //     console.log(res.body)
    //   )
    //   .then(res =>
    //     this.setState({ userConfig: res })
    //   )

    //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    // console.log('DID MOUNT!!!!')
    // const settings = getSettingsNew();
    // console.log(settings);


    //this.getUserConfigSettings();
        // this._asyncRequest = this.getUserConfigSettings().then(
        //    userConfig => {
        //      console.log('_asyncRequest');
        //      console.log(userConfig);
        //      this._asyncRequest = null;
        //      this.setState({userConfig});
        //    }
        //  );
  }

  // async getUserConfigSettings() {
  //   try {
  //     const config = await getSettings();
  //     console.log('THE CONFIG*****');
  //     console.log(JSON.stringify(config));
  //     if (config) {
  //       //this.setState({userConfig: config});
  //       console.log('State updated..... ');
  //       console.log(this.state.userConfig);
  //     }
  //
  //     //return config;
  //
  //   } catch(e) {
  //       console.warn(e);
  //   }
  // }

  componentWillMount() {
    console.log('will mount');
    //console.log(this.state.userConfig);
  }

  handleChange(event) {
    this.setState({
	value: event.target.value,
	//solenoid: !this.state.solenoid
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

  selectChange(event){
    const newField = 'VALVES.defaultShutoffDuration';
    const newValue = event.target.value;
    updateSettings(newField, newValue);
    this.setState({selectValue: newValue});
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
        <p>something</p>


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
      {/**/}
      </React.Fragment>
    );
  }
}
