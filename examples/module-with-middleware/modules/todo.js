import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
import { v4 } from 'uuid';

const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      middleware: [
        (_, {payload: { todo }, meta}) => {
          const id = v4();
          console.log('Middleware adding ID', id);
          return {
            payload: { todo: { ... todo, id } },
            meta
          };
        },
      ],
      reducer: (state, {payload: { todo }}) => {
        return state.push(fromJS(todo));
      },
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        return state.delete(index);
      },
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
      reducer: (state, {payload: { index, todo: updates }}) => {
        return state.update(
          index,
          todo => todo.merge(fromJS(updates))
        );
      },
    },
  ],
});
