import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Connected from './handlers/ModuleConnectedTodos';
import MultipleConnected from './handlers/MultipleConnected';

import store from './store';

class TodoApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Connected title="Todos w/ connectModule" />
          <MultipleConnected />
        </div>
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#todos');
  render(<TodoApp/>, node);
});
