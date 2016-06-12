import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List, Map } from 'immutable';

const { shape, number, string, bool, object } = PropTypes;

export default function createCollection(module) {
  return createModule({
    name: `${module.name}s`,
    initialState: Map(),
    transformations: [
      {
        action: 'CREATE',
        reducer: (state, action) =>
          state.set(5, module.reducer(module.initialState, action)),
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
        action: 'UPDATE',
        payloadTypes: {
          id: string.isRequired,
          action: shape({
            type: string,
            payload: object,
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
