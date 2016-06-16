import React, { PropTypes } from 'react';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';

const Counter = ({id, counter, count, stateCount}) => (
  <div>
    <button onClick={
      () => {
        const meta = (typeof id === 'number') ? {
          ancestors: [{name: 'todos'} , { name: 'counter' }],
          counter: { id },
        } : {};

        counter.actions.increment(null, meta);
      }
    }>
      +
    </button>
    <h2>Count: {(typeof id === 'number') ? count : stateCount}</h2>
    <button onClick={
      () => {
        const meta = (typeof id === 'number') ? {
          ancestors: [{name: 'todos'} , { name: 'counter' }],
          counter: { id },
        } : {};

        counter.actions.decrement(null, meta);
      }
    }>
      -
    </button>
  </div>
);

export default connectModule(
  state => { return {
    stateCount: state.counter,
  } },
  counterModule,
  Counter
);
