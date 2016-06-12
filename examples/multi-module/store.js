import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { List, fromJS } from 'immutable';
import createLogger from 'redux-logger';

import rootModule from './modules/root';

const reducer = rootModule.reducer;

let logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger)
)(createStore);

export default createStoreWithMiddleware(reducer, fromJS({}));
