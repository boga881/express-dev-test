import React, { Fragment, Component } from "react";
import * as AuthService from "utils/authService";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../utils/authService";

class LogoutUser extends Component {

  render() {
    
    AuthService.logout();
    return <Redirect to='/login'  />
    
  }
}
export default LogoutUser;
