import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import TodoList from './handlers/TodoList';
import Counter from './handlers/Counter';

import store from './store';

export default class ExampleApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Module Composition Example</h1>
          <TodoList />
          <Counter />
        </div>
      </Provider>
    );
  }
}
