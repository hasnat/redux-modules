import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';

const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'todos',
  initialState: Map(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        description: string.isRequired,
      },
      composes: [
        {
          reducer: todoModule.reducer,
          path: [ action.payload.id ]
          action: payload => todoModule.actions.init(),
        }
      ],
      reducer: state => state,
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        id: number.isRequired,
      },
      reducer: (state, {payload: { id }}) => {
        return state.delete(id);
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
      composes: [
        {
          reducer: todoModule.reducer,
          path: [ action.payload.id ],
          action: payload => payload.action,
        }
      ],
      reducer: state => state,
    },
  ],
});
