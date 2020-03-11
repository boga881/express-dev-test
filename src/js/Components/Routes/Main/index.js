import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import ValveSwitch from 'Components/ValveSwitch';
import Logo from 'Components/Logo';
import { createBrowserHistory } from 'history'

function Main(props) {

  let DevTools = process.env.NODE_ENV !== 'production'
    ? DevTools = require('Utils/devtools')
    : null;

  const history = createBrowserHistory();

  const handleNav = (path, e) => (
    e.preventDefault(),
    history.push(path)
  );

  return (
    <div>
      <DevTools />
      <header>
        <nav className='top-nav'>
          <div className='nav-wrapper'>
            <a className='brand-logo hide-on-med-and-down'>
              <Logo style={{width:"2rem",height:"2rem",marginLeft:"8px",marginRight:"8px"}} />
            </a>
            <a href='/' data-activates='mobile-nav' className='sidenav-open button-collapse'>
              <i style={{marginLeft:'52px'}} className='material-icons'>menu</i>
            </a>

            <ValveSwitch />
          </div>
        </nav>
      </header>

      <main>
        <div className='container'>
          { props.children }
        </div>
      </main>

      <footer className='center'>
      </footer>
    </div>
  );
}

export default connect()(Main);
