import React from 'react';
import { moduleProvider as ModuleProvider } from '../../src';

import MultipleConnected from './handlers/MultipleConnected';

import store from './store';

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
