import React from 'react';
import { render } from 'react-dom';
import wrapProvider from '../utils/wrapProvider';
import { createModule } from '../../src/index';

import Counter, { module as counterModule } from './Counter';

const module = createModule({
  name: 'app',
  initialState: {},
  transformations: [
    {
      name: 'TOP',
      reducer: (state, action) => {
        return {
          ... state,
          topCounter: counterModule.reducer(
            state.topCounter,
            action
          ),
        };
      },
    },
    {
      name: 'BOTTOM',
      reducer: (state, action) => {
        return {
          ... state,
          bottomCounter: counterModule.reducer(
            state.bottomCounter,
            action
          ),
        };
      },
    },
  ],
});

const App = props => (
  <div>
    <h1>Counter 1</h1>
    <Counter />
    <h1>Counter 2</h1>
    <Counter />
  </div>
);

const Connected = wrapProvider(
  { app: module.reducer },
  App
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#examples');
  render(<Connected />, node);
});
