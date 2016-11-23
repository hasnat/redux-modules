import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from '../../../lib';
import { createStore } from 'redux';
import { install, combineReducers } from 'redux-loop';
import App from './App';
import './index.css';

const store = createStore(s => s, {}, install());

ReactDOM.render(
  <ModuleProvider store={store} combineReducers={combineReducers}>
    <div style={{display: 'flex', width: '100%', height: '100%'}}>
      <App />
    </div>
  </ModuleProvider>,
  document.getElementById('root')
);
