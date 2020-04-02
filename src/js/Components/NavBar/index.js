import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
//import Main from 'components/Routes/Main';
//import Schedule from 'components/Routes/Schedule';
import Settings from 'components/Routes/Settings';
//import History from 'Components/Routes/History';
//import Login from 'components/Routes/Login';
import Button from 'components/Button';
import NotFound from 'components/Routes/NotFound';
import logo from 'images/icon.png';
import sidebar from 'images/sidebar.jpg';

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    M.Sidenav.init(this.Sidenav);
    let instance = M.Sidenav.getInstance(this.Sidenav);
  }

  render() {

    return (
      <React.Fragment>
        <nav>
          <div class="nav-wrapper blue">
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <a href="#!" class="brand-logo"><i class="material-icons">cloud</i>Logo</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="sass.html"><i class="material-icons">search</i></a></li>
              <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
              <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
              <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
            </ul>
          </div>
        </nav>

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
          {/* <a href="#" data-target="slide-out" className="sidenav-trigger">
             <i className="material-icons">menu</i>
           </a>*/}
        </div>

        <Switch>
          <Route exact path='/' component={Button} />
          <Route path='/settings' component={Settings} />
          {/*<Route path='/login' component={Login} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/history' component={History} />
          <Route component={NotFound} />*/}
        </Switch>

      </Router>
      </React.Fragment>
    );
  }
}

export default NavBar;
