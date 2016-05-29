import React from 'react';
import { render } from 'react-dom';

import { connectModule, createModule } from '../../src/index';
import wrapProvider from '../utils/wrapProvider';

const module = createModule({
  name: 'counter',
  initialState: 0,
  transformations: [
    {
      action: 'INCREMENT',
      reducer: state => state + 1,
    },
    {
      action: 'DECREMENT',
      reducer: state => state - 1,
    },
  ],
});

const selector = state => { return { count: state.counter } };

const ButtonExample = ({ counter: { actions, count } }) => (
  <div>
    <button onClick={actions.increment}>
      +
    </button>
    <h2>{count}</h2>
    <button onClick={actions.decrement}>
      -
    </button>
  </div>
);

const ConnectedButtonExample = connectModule(selector, module, ButtonExample);

const App = wrapProvider(
  { counter: module.reducer },
  ConnectedButtonExample
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#todos');
  render(<App/>, node);
});
