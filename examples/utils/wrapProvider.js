import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import createStore from './createStore';

export const wrapProvider = (reducer, Component) => props => (
  <Provider store={createStore(combineReducers(reducer))}>
    <Component {...props} />
  </Provider>
);

export default wrapProvider;
