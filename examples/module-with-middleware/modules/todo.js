import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
import { v4 } from 'uuid';

const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'todos',
  initialState: List(), // eslint-disable-line new-cap
  transformations: [
    {
      type: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      middleware: [
        ({ payload: { todo }, meta, ... rest }) => {
          const id = v4();
          console.log('Middleware adding ID', id); // eslint-disable-line no-console
          return {
            payload: { todo: { ...todo, id } },
            meta,
            ... rest,
          };
        },
      ],
      reducer: (state, { payload: { todo } }) => state.push(fromJS(todo)),
    },
    {
      type: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, { payload: { index } }) => state.delete(index),
    },
    {
      type: 'UPDATE',
      payloadTypes: {
        index: number.isRequired,
        todo: shape({
          description: string,
          checked: bool,
        }),
      },
      reducer: (state, { payload: { index, todo: updates } }) =>
        state.update(index, todo => todo.merge(fromJS(updates))),
    },
  ],
});
