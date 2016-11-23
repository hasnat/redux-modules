import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore } from 'redux';
import { install, combineReducers } from 'redux-loop';
import UberBox from './App';
import './index.css';

const store = createStore(s => s, {}, install());

ReactDOM.render(
  <ModuleProvider store={store} combineReducers={combineReducers}>
    <div style={{display: 'flex', width: '100%', height: '100%'}}>
        <UberBox />
    </div>
  </ModuleProvider>,
  document.getElementById('root')
);
