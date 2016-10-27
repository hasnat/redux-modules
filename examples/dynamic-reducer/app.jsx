import React from 'react';

import { ModuleProvider } from '../../src';
import MultipleConnected from './handlers/MultipleConnected';
import store from './store';

export default class ExampleApp extends React.Component {
  render() {
    return (
      <ModuleProvider store={store}>
        <div>
          <h1>Dynamic Reducer Example</h1>
          <MultipleConnected />
        </div>
      </ModuleProvider>
    );
  }
}
