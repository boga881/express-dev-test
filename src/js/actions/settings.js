import actions from 'actions/action-types';
import superagent from 'superagent';
import request from "superagent";
import nocache from 'superagent-no-cache';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export function getSettings() {
  return request.get('/api/settings')
    .then(response => {
      if (response.statusCode === 200) {
        return {
          success: true,
          message: response.body,
        }
      } else {
        return {
          success: false,
          message: response.body,
        }
      }
    }).catch(err => {
      console.log("error with getting settings: " + err);
      return {
        success: false,
        message: err,
      }
    });
}

export function updateSettings(path, value) {
  if (devServerEnabled) {
    console.group('Updating Settings:');
    console.log('path: ' + path);
    console.log('value: ' + value);
    console.groupEnd();
  }

  request.post('/api/settings')
    .send({'path': path, 'value': value})
    .then(response => {
      if (response.statusCode === 200) {
        return {
          success: true,
          message: 'user settings updated',
        }
      } else {
        return {
          success: false,
          message: 'error occured updating user settings',
        }
      }
    }).catch(err => {
      console.log("error with updating settings: " + err);
      return {
        success: false,
        message: err,
      }
    });
}
