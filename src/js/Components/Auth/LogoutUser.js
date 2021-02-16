import React, { Fragment, Component } from "react";
import * as AuthService from "utils/authService";
import { Redirect } from "react-router-dom";

class LogoutUser extends Component {

  render() {
      console.log('logging user out....');
    AuthService.logout();

    return (
        <Redirect to='/login' />
    );
    
  }
}

export default LogoutUser;
