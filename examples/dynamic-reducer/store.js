import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';
import createLogger from 'redux-logger';

import todoModule from './modules/todo';
import counterModule from './modules/counter';

let logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger)
)(createStore);

export default createStoreWithMiddleware(state => state, {});
