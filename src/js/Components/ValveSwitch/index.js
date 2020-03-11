import React from 'react';
import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import { pollValve, toggleValve } from 'Actions/valve.js';

function ValveSwitch(props) {

  const handleChange = () => props.dispatch(toggleValve());

  return (<div className='right switch'>
    <label>
      Closed
      <input type='checkbox' {...tapOrClick(handleChange)} checked={props.open}/>
      <span className='lever'></span>
      Open
    </label>
  </div>);
}

export default connect()(ValveSwitch);
