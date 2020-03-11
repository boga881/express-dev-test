import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
//import Main from 'components/Routes/Main';
//import Schedule from 'components/Routes/Schedule';
//import Settings from 'components/Routes/Settings';
//import History from 'Components/Routes/History';
//import Login from 'components/Routes/Login';
import NotFound from 'components/Routes/NotFound';
import logo from 'images/icon.png';
import sidebar from 'images/sidebar.jpg';

class SideNav extends Component {

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

  render() {

    return (
      <Router>
        <div>
          <ul ref={Sidenav => {this.Sidenav = Sidenav;}} id='slide-out' className='sidenav'>
            <li>
              <div className="user-view">
                <div className="background">
                  <img src={sidebar} />
                </div>
                <a href="#user">
                  <img className="circle" src={logo} />
                </a>
                <a href="#name">
                  <span className="white-text name">John Doe</span>
                </a>
                <a href="#email">
                  <span className="white-text email">jdandturk@gmail.com</span>
                </a>
              </div>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">cloud</i>First Link With Icon
              </a>
            </li>
            <li className='sidenav-close'>
              {/*<i className='material-icons left'>*/}
              <Link to="/schedule">Schedule</Link>
              {/*</i>*/}
            </li>
            <li className='sidenav-close'>
              {/*<i className='material-icons left'>*/}
                <Link to="/history">History</Link>
              {/*</i>*/}
            </li>
            <li className='sidenav-close'>
              {/*<i className='material-icons left'>*/}
                <Link to="/settings">Settings</Link>
              {/*</i>*/}
            </li>
            <li className='sidenav-close'>
              {/*<i className='material-icons left'>*/}
                <Link to="/logout">Logout</Link>
              {/*</i>*/}
            </li>
            <li>
              <div className="divider" />
            </li>
            <li>
              <a className="subheader">Subheader</a>
            </li>
            <li>
              <a className="waves-effect" href="#!">
                Third Link With Waves
              </a>
            </li>
          </ul>
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>

      {/*  <Switch>
          <Route exact path='/' component={Main} />
          // <Route path='/login' component={Login} />
          // <Route path='/schedule' component={Schedule} />
          // <Route path='/settings' component={Settings} />
          // <Route path='/history' component={History} />
          <Route component={NotFound} />
        </Switch> */}

      </Router>
    );
  }
}

export default SideNav;
