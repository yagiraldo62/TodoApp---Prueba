import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();
/* eslint-disable no-underscore-dangle */
export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
/* eslint-enable */
