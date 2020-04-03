import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
//import ValveSwitch from 'components/ValveSwitch';
import Logo from 'components/Logo';
import { createBrowserHistory } from 'history'

function Main(props) {


  return (
    <div>
    {/*<DevTools />*/}
      Main page. fuck you.
    </div>
  );
}

export default connect()(Main);
