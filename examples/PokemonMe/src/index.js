import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { install, combineReducers } from 'redux-loop';
import { ModuleProvider } from '../../../lib';
import App from './App';
import exportModule from './module';
import './index.css';

const store = createStore(s => s, {}, install());

export const module = exportModule;
export const Component = App;
export const Bootstrapped = () => (
  <ModuleProvider store={store} combineReducers={combineReducers}>
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <App />
    </div>
  </ModuleProvider>
);

const mountPoint = document.getElementById('pokemon-example');
if (mountPoint) {
  ReactDOM.render(
    <Bootstrapped />,
    mountPoint,
  );
}
