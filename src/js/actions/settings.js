import actions from 'actions/action-types';
import superagent from 'superagent';
import request from "superagent";
import nocache from 'superagent-no-cache';

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

export function updateSettings(path, value, returnNewUserConfig = false) {
  console.log('begin updateSettings:');
  console.log('settings-path= ' + path);
  console.log('settings-value= ' + value);

  request.post('/api/settings')
    .send({'path': path, 'value': value})
    .then(response => {
      if (returnNewUserConfig) {
        console.log('returnNewUserConfig');
        let newConfig = fetch('/api/settings')
          .then(response => {
            return response;
          });

      }
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

//   superagent
//     .post('/api/settings')
//     .send({'path': path, 'value': value})
//     .then(res => {
//       console.log('yay got ' + JSON.stringify(res))
//     })
//     .catch(console.log('there was an error posting'));
}
