import { combineReducers } from 'redux';
import App from './App.reducers';
import User from './User.reducers';
export default combineReducers({
	App,
	User,
});
