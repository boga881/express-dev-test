import actions from 'actions/action-types';
import superagent from 'superagent';
import nocache from 'superagent-no-cache';
//const superagent = require('superagent');
//import superagent from 'utils/superagent-promise';
//import {apiError} from './api';


/*export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})*/
export function getSettingsNew() {
  const userConfig = async () =>
  await fetch('/api/settings')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
}

export function getSettings() {
  // Change to syncronous request
  console.log('Getting settings: ');

  const res = superagent
    .get('/api/settings')
    .then(res => {
      console.log('Got settings: ');
      console.log(res);
      return res.body
    });

  // (async () => {
  //   try {
  //     const res = await superagent.get('/api/settings');
  //     console.log('Got settings: ');
  //     console.log(res);
  //     return res.body;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // })();
}

export function updateSettings(path, value, returnUpdatedConfig = false) {
  console.log('begin updateSettings:');

  console.log('settings-path= ' + path);
  console.log('settings-value= ' + value);

  superagent
    .post('/api/settings')
    .send({'path': path, 'value': value})
    .then(res => {
      console.log('yay got ' + JSON.stringify(res))
    })
    .catch(console.log('there was an error posting'));

    if (returnUpdatedConfig) {
      return getSettings();
    }
}



//export default {getSettings}
{/*export function getSettings() {
 superagent
    .get('/api/settings')
    .use(nocache)
    .then(res => {
    })
    .catch(err => {
       err.message
    });
}*/}


  /*return dispatch => {
    dispatch({
      type: actions.GET_SETTINGS_START
    });

    superagent
      .get('/api/1/settings')
      .accept('json')
      .end()
      .then(res => {
        res.body.type = actions.GET_SETTINGS_FINISH;
        dispatch(res.body);
      })
      .catch(err => {
        dispatch({
          type: actions.GET_SETTINGS_FINISH,
          success: false
        });
        dispatch(err);
      });
  };
}*/

/* export function updateSettings(settings) {
  console.log('updateSettings:');
  //let sett = JSON.parse(settings);
  console.log(settings);
  return dispatch => {
    dispatch({
      type: actions.UPDATE_SETTINGS_START
    });

    superagent
      .post('/api/settings')
      .set('Content-Type', 'application/json')
      .send(settings)
      .then(res => {
        res.body.type = actions.UPDATE_SETTINGS_FINISH;
        dispatch(res.body);
      })
      .catch(err => {
        dispatch({
          type: actions.UPDATE_SETTINGS_FINISH,
          success: false
        });
        dispatch(err);
      });
  };
}
*/
