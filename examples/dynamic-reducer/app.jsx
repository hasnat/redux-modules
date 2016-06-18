import React from 'react';
import { combineReducers } from 'redux';

import { createModuleProvider } from '../../src';
import MultipleConnected from './handlers/MultipleConnected';
import store from './store';

const ModuleProvider = createModuleProvider(reducers => {
  console.log('Injected combiner');
  return combineReducers(reducers);
});

export default class ExampleApp extends React.Component {
  render() {
    return (
      <ModuleProvider store={store}>
        <div>
          <h1>Multi Module Example</h1>
          <MultipleConnected />
        </div>
      </ModuleProvider>
    );
  }
}
