import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MultipleConnected from './handlers/MultipleConnected';

import store from './store';

export default class ExampleApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MultipleConnected />
        </div>
      </Provider>
    );
  }
}
