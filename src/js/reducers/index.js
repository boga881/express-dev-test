import { combineReducers } from 'redux';
import { Router, Switch } from 'react-router';
//import authReducer from './auth-reducer';
//import valveReducer from './valve-reducer'
//import scheduleReducer from './schedule-reducer';
//import historyReducer from './history-reducer';
import settingsReducer from './settings-reducer';

export default combineReducers({
  settings: settingsReducer
  /*auth: authReducer,
  routing: {Router},
  valve: valveReducer,
  schedule: scheduleReducer,
  history: historyReducer,*/
})
