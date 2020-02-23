import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import person from './person';

export default combineReducers({
  alert,
  auth,
  profile,
  person
});
