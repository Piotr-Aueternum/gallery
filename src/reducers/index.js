import { combineReducers } from 'redux';
import data from './data';
import page from './page';
import query from './query';

export default combineReducers({
  data,
  page,
  query,
});
