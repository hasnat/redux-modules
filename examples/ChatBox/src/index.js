import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore } from 'redux';
import { install } from 'redux-loop';
import App from './App';
import './index.css';

const store = createStore(s => s, {}, install());

ReactDOM.render(
  <ModuleProvider store={store}>
    <App />
  </ModuleProvider>,
  document.getElementById('root')
);
