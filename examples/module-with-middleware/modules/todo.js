import { createModule, middleware } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
import { v4 } from 'uuid';

const { shape, number, string, bool } = PropTypes;

function addUUID({ payload: { todo }, meta, ... rest }) {
  const id = v4();
  console.log('Middleware adding ID', id); // eslint-disable-line no-console
  return {
    payload: { todo: { ...todo, id } },
    meta,
    ... rest,
  };
}

export default createModule({
  name: 'todos',
  initialState: List(), // eslint-disable-line new-cap
  transformations: [
    {
      type: 'create',
      middleware: [
        addUUID,
        middleware.propCheck({
          todo: shape({
            description: string.isRequired,
          }),
        }),
      ],
      reducer: (state, { payload: { todo } }) => state.push(fromJS(todo)),
    },
    {
      type: 'destroy',
      middleware: [
        middleware.propCheck({
          index: number.isRequired,
        }),
      ],
      reducer: (state, { payload: { index } }) => state.delete(index),
    },
    {
      type: 'update',
      middleware: [
        middleware.propCheck({
          index: number.isRequired,
          todo: shape({
            description: string,
            checked: bool,
          }),
        }),
      ],
      reducer: (state, { payload: { index, todo: updates } }) =>
        state.update(index, todo => todo.merge(fromJS(updates))),
    },
  ],
});
