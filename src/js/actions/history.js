import actions from 'actions/action-types';
import request from "superagent";
import nocache from 'superagent-no-cache';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export async function getHistory() {
  return request.get('/api/history')
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
      console.log("error with getting history: " + err);
      return {
        success: false,
        message: err
      }
    });
}

export function updateHistory(path, value) {
  if (devServerEnabled) {
    console.group('Updating History:');
    // console.log('path: ' + path);
    // console.log('value: ' + value);
    console.groupEnd();
  }

  const res = request.post('/api/history')
    .send({'path': path, 'value': value})
    .set('accept', 'json')
    .end((err, res) => {
      if (res.statusCode === 200) {
        return {
          success: true,
          message: 'history updated',
        }
      } else {
        return {
          success: false,
          message: 'error occured updating history',
        }
      }
    });
}
