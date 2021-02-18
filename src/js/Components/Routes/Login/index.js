import React from 'react';
import * as AuthService from "utils/authService";

import { Button, Col, TextInput, Row } from 'react-materialize';

export default class Login extends React.Component {

  constructor(props) {
      super(props);
  }

  loginHandler = () => {
    console.log("Came to login handler");
    const isLoggedIn = AuthService.login();
    this.setState({ 
        redirectToReferrer: true,
        isLoggedIn: isLoggedIn,
    });
  };

  render() {
    return (
        <div className={"col s6"}>
          <TextInput
            s={5}
            name={`username`}
            className='login__username'
            label="User Name"
            //onChange={(e) => this.handleInputChange(e)}
            placeholder="Username"

          />
          <TextInput
            s={5}
            name={`password`}
            className='login__password'
            label="Password"
            //onChange={(e) => this.handleInputChange(e)}
            placeholder="Password"
        />

        <Button onClick={this.loginHandler} node="button" className="modal-action green">Login</Button>

        </div>
        
      
    );
  }
}
