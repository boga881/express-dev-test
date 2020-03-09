import React from 'react';
const superagent = require('superagent');

export default class Button extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        logging: 'No Logging'
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(e) {
    e.preventDefault;
    console.log('The button was clicked.');

    (async () => {
      try {
        const res = await superagent.post('/api/pew');
        console.log(res);
        this.setState({logging: JSON.stringify(res.body)});
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
