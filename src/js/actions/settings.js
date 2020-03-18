import actions from 'actions/action-types';
const superagent = require('superagent');
//import superagent from 'utils/superagent-promise';
//import {apiError} from './api';


/*export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})*/

export function getSettings() {
  return dispatch => {
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
}

export function updateSettings(settings) {
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
