import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import Schedule from 'components/Routes/Schedule';
import Settings from 'components/Routes/Settings';
import History from 'components/Routes/History';
import Button from 'components/Button';
import SideNav from 'components/SideNav';
import NavBar from 'components/NavBar';

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import '../css/style.scss';

function App() {
  return (
    <div className="container">
      <Router>
          <NavBar />

          <Switch>
            <Route exact path='/' component={Button} />
            <Route path='/settings' component={Settings} />
            <Route path='/schedule' component={Schedule} />
            <Route path='/history' component={History} />
          </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("app-container");
ReactDOM.render(<App />, rootElement);
