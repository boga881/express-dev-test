import React, { Component } from 'react';
import tapOrClick from 'react-tap-or-click';
import { connect } from 'react-redux';
import superagent from 'Utils/superagent-promise';
import * as keys from 'Keys';
import PropTypes from 'prop-types'

class UserLocationComponent extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    location: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      notSupported: false,
      denied: false
    };
  }

  componentDidMount() {
    this.setStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateFromProps(nextProps);
  }

  setStateFromProps(props) {
    this.setState({
      location: props.location
    });

    if (!props.location) {
      this.findLocation();
    }
    else {
      superagent
        .get(`/api/1/weather?lat=${props.location.latitude}&lon=${props.location.longitude}`)
        .accept('json')
        .end()
        .then(res => {
          if (res.body.success) {
            this.setState({ weather: res.body.weather });
          }
        })
        .catch(() => {
          this.setState({ weather: null });
        });
    }
  }

  findLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const newState = {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
        };
        this.setState(newState);
        this.props.onChange(newState.location);
      },() => {
        this.setState({ denied: true });
      });
    }
    else {
      this.setState({ notSupported: true });
    }
  }

  render() {
    const { denied, notSupported, location, weather } = this.state;
    return (
      <React.Fragment>
        {(denied || notSupported) &&
          <div className="row">
            <div className="col s12">
              <div className="card-panel teal">
                <span className="white-text">
                  {denied
                    ? 'To use the weather checking feature this application must be able to determine your current location. Ensure that you have given permission for this website to view your location information.'
                    : 'Your browser doesn\t support geolocation. To use the weather checking feature this application must be able to determine your current location.'
                  }
                </span>
              </div>
            </div>
          </div>
        }

        {!location &&
          <div className='row'>
            <div className='col s12'>
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
          </div>
        }

        {location &&
          <div>
            { weather &&
              <div className='weather-info'>
                <img src={this.state.weather.icon} />
                <h5 className='right'>{this.state.weather.description}</h5>
              </div>
            }
            <img style={{width:'100%',maxWidth:'100%'}}src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.location.latitude},${this.state.location.longitude}&zoom=15&size=1280x720&key=${keys.GOOGLE_MAPS_API_KEY}`} />
          </div>
        }
      </React.Fragment>
    );
  }

}

export default connect()(UserLocationComponent);
