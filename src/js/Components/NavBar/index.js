import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import logo from 'images/logo.png';
import icon from 'images/icon32x32.png';
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
          <div className="nav-wrapper blue">
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <a href="/" className="brand-logo"><i className="material-icons left">whatshot</i>ICUP</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/schedule"><i className="material-icons left">timer</i>Schedule</Link>
              </li>
              <li>
                <Link to="/history"><i className="material-icons left">history</i>History</Link>
              </li>
              <li>
                <Link to="/settings"><i className="material-icons left">settings</i>Settings</Link>
              </li>
            </ul>
          </div>
        </nav>


        <div>
          <ul ref={Sidenav => {this.Sidenav = Sidenav;}} id='slide-out' className='sidenav'>
            <li>
              <div className="user-view">
                <div className="background">
                  <img src={sidebar} />
                </div>
                <a href="#name">
                  <span className="white-text name">John Doe</span>
                </a>
                <a href="#email">
                  <span className="white-text email">jdandturk@gmail.com</span>
                </a>
              </div>
            </li>
            <li className='sidenav-close'>
              <Link to="/"><i className="material-icons">home</i>Home</Link>
            </li>
            <li className='sidenav-close'>
              <Link to="/schedule"><i className="material-icons">timer</i>Schedule</Link>
            </li>
            <li className='sidenav-close'>
              <Link to="/history"><i className="material-icons">history</i>History</Link>
            </li>
            <li className='sidenav-close'>
                <Link to="/settings"><i className="material-icons">settings</i>Settings</Link>
            </li>
            <li>
              <div className="divider" />
            </li>
            <li>
              <a className="subheader">User</a>
            </li>
            <li className='sidenav-close'>
              <Link to="/logout" className="waves-effect"><i className="material-icons">account_circle</i>Logout</Link>
            </li>
          </ul>
          {/* <a href="#" data-target="slide-out" className="sidenav-trigger">
             <i className="material-icons">menu</i>
           </a>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
