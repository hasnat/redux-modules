import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore } from 'redux';
import { install, combineReducers } from 'redux-loop';
import App from './App';
import './index.css';

const store = createStore(s => s, {}, install());
//
// ReactDOM.render(
//   <ModuleProvider store={store} combineReducers={combineReducers}>
//     <App />
//   </ModuleProvider>,
//   document.getElementById('root')
// );

import Stopwatch from './App';
import module from './module';

export default {
  component: Stopwatch,
  module,
}
