import React from 'react';
import { render } from 'react-dom';
import { Map } from 'immutable';

import { connectModule, createModule } from '../../src/index';
import wrapProvider from '../utils/wrapProvider';

const module = createModule({
  name: 'field',
  initialState: Map(),
  transformations: [
    {
      action: 'NEW_CONTENT',
      reducer: (state, { payload }) =>
        state.set('content', payload),
    },
  ],
});

const selector = state => {
  return {
    field: { content: state.field.toJS().content }
  };
};

const FieldExample = ({ field: { actions, content } }) => (
  <div>
    <input onChange={e => actions.newContent(e.target.value)} />
    <h2>{content}</h2>
  </div>
);

const ConnectedFieldExample = connectModule(
  selector,
  module,
  FieldExample
);

const App = wrapProvider(
  { field: module.reducer },
  ConnectedFieldExample
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#examples');
  render(<App/>, node);
});
