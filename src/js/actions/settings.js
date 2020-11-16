import actions from 'actions/action-types';
import request from "superagent";
import nocache from 'superagent-no-cache';
const userConfigFile = './config/user.config.json';
const devServerEnabled = process.env.NODE_ENV !== 'production';


export function getSettings() {
  console.log("start get");
  return request.get('/api/settings')
    .use(nocache)
    .then(res => {
      if (res.statusCode === 200) {
        return {
          success: true,
          message: res.body,
        }
      } else {
        return {
          success: false,
          message: res.body
        }
      }
    })
    .catch(err => {
      console.log("error with getting settings: " + err);
      return {
        success: false,
        message: err
      }
    });
}

export function updateSettings(name, value, id) {
  if (devServerEnabled) {
    console.group('Updating Settings:');
    console.log('name: ' + name);
    console.log('value: ' + value);
    console.log('id: ' + id);
    console.groupEnd();
  }

  //const res = request.post('/api/settings')
  const res = request.post('/api/v2/update')
    .send({'name': name, 'value': value, 'id': id, 'file': userConfigFile})
    .set('accept', 'json')
    .end((err, res) => {
      if (res.statusCode === 200) {
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
    });
    console.log("end update");
}
