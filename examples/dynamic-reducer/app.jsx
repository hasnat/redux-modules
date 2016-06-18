import React from 'react';
import { createModuleProvider } from '../../src';
import MultipleConnected from './handlers/MultipleConnected';
import store from './store';

const ModuleProvider = createModuleProvider();

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
