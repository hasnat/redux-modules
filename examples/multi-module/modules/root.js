import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List, Map } from 'immutable';
import { v4 } from 'uuid';

import todosModule from './todos';

const { shape, number, string, bool, any } = PropTypes;

// const action = {
//   type: 'todos',
//   payload: {
//     action: {
//       type: 'todos/UPDATE',
//       payload: {
//         id: 5,
//         action: {
//           type: 'todo/SET_NAME',
//           payload: 'hi'
//         }
//       },
//     },
//   },
// };

export default createModule({
  name: 'root',
  initialState: Map(),
  transformations: [
    {
      action: 'TODOS',
      propTypes: {
        action: shape({
          type: string.isRequired,
          payload: any.isRequired,
        }),
      },
      reducer: (state, {payload}) =>
        state.update(
          'todos',
          todos => todosModule.reducer(todos, { ... payload.action })
        ),
    },
  ],
});
