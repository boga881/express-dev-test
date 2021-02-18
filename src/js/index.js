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
          
            <ProtectedRoute exact path='/' component={Main} />
            <ProtectedRoute exact path='/schedule' component={Schedule} />
            <ProtectedRoute exact path='/history' component={History} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <ProtectedRoute exact path="/logout" component={LogoutUser} />

            <Route exact path="/login" exact component={NotifyLogin} />
            
          {/* </Switch> */}
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("app-container");
ReactDOM.render(<App />, rootElement);
