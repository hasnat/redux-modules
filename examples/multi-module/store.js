import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { List, fromJS } from 'immutable';
import createLogger from 'redux-logger';

import todoModule from './modules/todo';
import counterModule from './modules/counter';

const reducer = combineReducers({
  todos: todoModule.reducer,
  counter: counterModule.reducer,
});

const logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger),
)(createStore);

export default createStoreWithMiddleware(reducer, List()); // eslint-disable-line new-cap
