import React, { Fragment, Component } from "react";
import * as AuthService from "utils/authService";
import { Redirect } from "react-router-dom";

class NotifyLogin extends Component {
  state = { redirectToReferrer: false };
  loginHandler = () => {
    console.log("Came to login handler");
    AuthService.login();
    this.setState({ redirectToReferrer: true });
  };
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <Fragment>
        <h1 className="content-header">
          You need to login before viewing this page.
        </h1>
        <div className="justify-center">
          <button className="btn btn-danger" onClick={this.loginHandler}>
            Login
          </button>
        </div>
      </Fragment>
    );
  }
}
export default NotifyLogin;
