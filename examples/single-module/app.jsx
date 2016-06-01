import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Connected from './handlers/ModuleConnectedTodos';

import store from './store';

export default class ExampleApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Connected title="Single Module Example" />
        </div>
      </Provider>
    );
  }
}
