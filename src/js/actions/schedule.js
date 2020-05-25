import actions from 'actions/action-types';
import request from "superagent";
import nocache from 'superagent-no-cache';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export async function getSchedules() {
  return request.get('/api/schedule')
    .use(nocache)
    .then(res => {
      if (res.statusCode === 200) {

        if (devServerEnabled) {
          console.group('Getting Schedule:');
          console.log('data set: ' + JSON.stringify(res.body));
          console.groupEnd();
        }

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
      console.log("error with getting schedule: " + err);
      return {
        success: false,
        message: err
      }
    });
}

export function updateSchedule(data) {
  if (devServerEnabled) {
    console.group('Updating Schedule:');
    console.log('schedule data: ' + JSON.stringify(data));
    console.groupEnd();
  }

  const res = request.post('/api/schedule')
    .send({'data': data})
    .set('accept', 'json')
    .end((err, res) => {
      if (res.statusCode === 200) {
        return getSchedules();
      } else {
        return {
          success: false,
          message: 'error occured updating schedule',
        }
      }
    });
}

export function removeSchedule(data) {
  if (devServerEnabled) {
    console.group('Removing Schedule:');
    console.log('schedule id: ' + JSON.stringify(data));
    console.groupEnd();
  }

  const res = request.post('/api/schedule/remove')
    .send({'data': data})
    .set('accept', 'json')
    .end((err, res) => {
      if (res.statusCode === 200) {
        return getSchedules();
      } else {
        return {
          success: false,
          message: 'error occured removing schedule',
        }
      }
    });
}
