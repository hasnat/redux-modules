import React from 'react';

import { connectModule, createModule } from '../../src/index';

export const module = createModule({
  name: 'counter',
  initialState: 0,
  transformations: [
    {
      action: 'INCREMENT',
      reducer: state => state + 1,
    },
    {
      action: 'DECREMENT',
      reducer: state => state -1 ,
    },
  ],
});

const selector = state => {
  return {
    counter: { count: state },
  };
};

const Counter = ({ counter: { count, actions } }) => (
  <div>
    <button onClick={actions.increment}>+</button>
    <h1>{count}</h1>
    <button onClick={actions.decrement}>-</button>
  </div>
);

export default connectModule(
  selector,
  module,
  Counter
);
