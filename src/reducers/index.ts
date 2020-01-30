import { combineReducers } from 'redux';
import test from './test';
import home from './homeReducer';

const todoApp = combineReducers({
  test,
  home
});

export default todoApp;
