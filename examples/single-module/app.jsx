import React from 'react';
import { Provider } from 'react-redux';

import Connected from './handlers/ModuleConnectedTodos';

import store from './store';

const ExampleApp = () => (
  <Provider store={store}>
    <div>
      <Connected title="Single Module Example" />
    </div>
  </Provider>
);

export default ExampleApp;
