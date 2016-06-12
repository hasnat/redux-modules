import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
import { v4 } from 'uuid';

const { shape, number, string, bool, any } = PropTypes;

const rootReducer = combineReducers({
 users: combineReducers({
    collection: collectionReducer(
      combineReducers({
        location: locationModule.reducer,
        description: descriptionReducer,
      })
    ),
  }),

  todos: combineReducers({
    collection: collectionReducer(
      combineReducers({
        location: locationModule.reducer,
        description: descriptionReducer,
      })
    ),
  }),
});

const collectionReducer = reducer => (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return state.update(
        action.payload.id,
        object =>
          reducer(object, action.payload.action);
    default:
      return state;
  }
};

const rootDispatch = dispatch => {
  return {
    actions: {
      todos: payload => {
        return dispatch({
          type: 'todos',
          action: payload,
        })
      }
    }
  }
}

const collectionDispatch = dispatch => {
  return {
    actions: {
      update: payload => dispatch({
        type: 'UPDATE',
        action: payload,
      }),
      create: payload => dispatch({
        type: 'CREATE',
        action: payload,
      }),
    },
  };
}

// const called like create={todoDispatch(actions.todos)}

const todoDispatch = (dispatch, props) => {
  return {
    update: payload => dispatch(
      todoModule.update({ id: props.actions.id, ...payload })
    ),
    location: payload => dispatch({ type: 'locations', action: payload }),
  }
}

// const called like init={locationDispatch.init(actions.location)}
const locationDispatch = dispatch => {
  init: payload => dispatch(location.init(payload))
}

// state = { todos: { '1': { ... } } }


const action = {
  type: 'root/TODOS',
  payload: {
    action: {
      type: 'todos/UPDATE',
      payload: {
        id: 5,
        action: {
          type: 'todo/UPDATE',
          description: 'hi'
        }
      },
    },
  },
};

export default createModule({
  name: 'root',
  initialState: Map(),
  transformations: [
    // action: {
    //  type: TODOS,
    //  payload: { action: { type, payload } }
    // }
    {
      action: 'TODOS',
      propTypes: {
        id: number.isRequired,
        action: shape({
          type: string.isRequired,
          payload: any.isRequired,
        }),
      },
      composes: [
        {
          reducer: todosModule.reducer,
          path: [ 'todos' ],
          action: payload => payload.action,
        }
      ],
      reducer: state => state,
    },
  ],
});
