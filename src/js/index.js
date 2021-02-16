import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import Schedule from 'components/Routes/Schedule';
import Settings from 'components/Routes/Settings';
import History from 'components/Routes/History';
import Main from 'components/Routes/Main';
import NavBar from 'components/NavBar';

import NotifyLogin from "components/Auth/NotifyLogin";
import LogoutUser from "components/Auth/LogoutUser";
import ProtectedRoute from "components/Auth/ProtectedRoute";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import '../css/style.scss';

function App() {
  return (
    <div className="container">
      <Router>
          <NavBar />

          {/* <Switch> */}
          
            <Route path="/login" exact component={NotifyLogin} />
            <ProtectedRoute exact path='/' component={Main} />
            <ProtectedRoute path='/schedule' component={Schedule} />
            <ProtectedRoute path='/history' component={History} />
            <ProtectedRoute path="/settings" component={Settings} />
            <ProtectedRoute exact path="/logout" component={LogoutUser} />
          {/* </Switch> */}
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("app-container");
ReactDOM.render(<App />, rootElement);
