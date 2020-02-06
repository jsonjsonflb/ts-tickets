import { combineReducers } from 'redux';
import home from './homeReducer';

const todoApp = combineReducers({
  home
});

export default todoApp;
