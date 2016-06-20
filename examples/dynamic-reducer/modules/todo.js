import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';

const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'todos',
  // eslint-disable-next-line new-cap
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      reducer: (state, { payload: { todo } }) => state.push(fromJS(todo)),
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, { payload: { index } }) => state.delete(index),
    },
    {
      action: 'UPDATE',
      payloadTypes: {
        index: number.isRequired,
        todo: shape({
          description: string,
          checked: bool,
        }),
      },
      reducer: (state, { payload: { index, todo: updates } }) =>
        state.update(
          index,
          todo => todo.merge(fromJS(updates))),
    },
  ],
});
