import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
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

const rootReducer = combineReducers({
  todos: collectionReducer(
    combineReducers({
      location: location.reducer,
      name: nameReducer,
    })
  ),
});

const collectionReducer = reducer => (state, action) => {
  switch (action.type) {
    case 'CREATE':
      const id = v4();
      return state.setIn(id, reducer());

    case 'DESTROY':
      return state.delete(action.id);

    case 'UPDATE':
      return state.update(
        action.payload.id,
        object => reducer(object, action.payload.action)
      );
    default:
      return state;
  }
}

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
          todos => collectionModule(todoModule)
    },
  ],
});
