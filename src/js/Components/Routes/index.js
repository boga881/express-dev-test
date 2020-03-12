import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import Button from 'components/Button';
//import Schedule from 'components/Routes/Schedule';
import Settings from 'components/Routes/Settings';
//import History from 'Components/Routes/History';
//import Login from 'components/Routes/Login';
import NotFound from 'components/Routes/NotFound';
import logo from 'images/icon.png';
import sidebar from 'images/sidebar.jpg';

class Routes extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const options = {
    //   inDuration: 250,
    //   outDuration: 200,
    //   draggable: true
    // };
    M.Sidenav.init(this.Sidenav);
    let instance = M.Sidenav.getInstance(this.Sidenav);
  }

  /*
    <ul className='side-nav' id='mobile-nav'>
        <li className={this.props.routing.path==='/'?'active':''}><a {...tapOrClick(this.handleNav.bind(this,'/'))}><i className='material-icons left'>schedule</i> Schedule</a></li>
        <li className={this.props.routing.path==='/history'?'active':''}><a {...tapOrClick(this.handleNav.bind(this,'/history'))}><i className='material-icons left'>history</i> History</a></li>
        <li className={this.props.routing.path==='/settings'?'active':''}><a {...tapOrClick(this.handleNav.bind(this,'/settings'))}><i className='material-icons left'>settings</i> Settings</a></li>
        <li><a href='/logout'><i className='material-icons left'>exit_to_app</i> Logout</a></li>
    </ul>
   */

  render() {

    return (

    {/*  <Router>

        <Switch>
          <Route exact path='/' component={Button} />
          <Route path='/settings' component={Settings} />
          <Route path='/login' component={Login} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/history' component={History} />
          <Route component={NotFound} />
        </Switch>

      </Router>*/}
    );
  }
}

export default Routes;
