import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List, Map } from 'immutable';
import uuid from 'uuid';
const { shape, number, string, bool, object } = PropTypes;

export default function createCollection(module) {
  return createModule({
    name: `${module.name}s`,
    initialState: Map(),
    transformations: [
      {
        action: 'CREATE',
        reducer: (state, action) => {
          const id = uuid.v4();
          const item = module.reducer(undefined, action)
          return state.set(id, item.set('id', id));
        },
      },
      {
        action: 'DESTROY',
        payloadTypes: {
          id: string.isRequired,
        },
        reducer: (state, {payload: { id }}) => {
          return state.delete(id);
        },
      },
      {
        action: 'todo',
        payloadTypes: {
          id: string.isRequired,
          action: shape({
            type: string,
          }),
        },
        reducer: (state, {payload}) =>
          state.update(
            payload.id,
            object => module.reducer(object, payload.action)
          ),
      },
    ],
  });
}
