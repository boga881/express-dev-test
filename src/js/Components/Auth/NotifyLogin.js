import React, { Fragment, Component } from "react";
import * as AuthService from "utils/authService";
import { Redirect } from "react-router-dom";
import Login from 'components/Routes/Login';
class NotifyLogin extends Component {

    state = { 
        redirectToReferrer: false 
    };
    
    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <Fragment>
                <div className="justify-center">
                    <Login /> 
                </div>
            </Fragment>
        );
    } 
}

export default NotifyLogin;
