import { createStore, applyMiddleware, compose } from 'redux';
import { Map, fromJS } from 'immutable';
import createLogger from 'redux-logger';

let logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger)
)(createStore);

export default reducer => createStoreWithMiddleware(reducer);
