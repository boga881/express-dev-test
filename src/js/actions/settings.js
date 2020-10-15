import actions from 'actions/action-types';
import request from "superagent";
import nocache from 'superagent-no-cache';
const devServerEnabled = process.env.NODE_ENV !== 'production';


export function getSettings() {
// export async function getSettings() {
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

export function updateSettings(name, value) {
  if (devServerEnabled) {
    console.group('Updating Settings:');
    console.log('name: ' + name);
    console.log('value: ' + value);
    console.groupEnd();
  }

  const res = request.post('/api/settings')
    .send({'name': name, 'value': value})
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
}
