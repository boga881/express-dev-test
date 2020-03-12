import React from 'react';
const superagent = require('superagent');

export default class Button extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        logging: 'No Logging',
        solenoid: 'false'
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
        const res = await superagent.post('/api/'+ endpoint);
        console.log('ENDPOINT: ' + endpoint);
        console.log(res);
        this.setState({logging: JSON.stringify(res.body)});
      } catch (err) {
        console.error(err);
      }
    })();

    // Pushover notification
    (async () => {
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

  render() {
    return (
      <div className='button'>
        <button onClick={this.handleClick}>Click Me</button>
        <br />
        <textarea onChange={this.handleChange} className='text' rows="4" cols="50" value={this.state.logging} />
      </div>
    );
  }
}
