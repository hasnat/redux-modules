import React, { PropTypes } from 'react';
import rootModule from '../modules/root';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  return state.toJS();
};

class MultipleConnected extends React.Component {
  static propTypes = {
    todos: shape({
      collection: array,
      actions: shape({
        create: func,
        destroy: func,
        update: func,
      }),
    }),
    counter: shape({
      count: number,
      actions: shape({
        increment: func,
        decrement: func,
      }),
    }),
  };

  componentDidMount() {
    this.props.root.actions.todos({
      action: {
        type: 'todos/CREATE',
      },
    });
    this.props.root.actions.todos({
      action: {
        type: 'todos/UPDATE',
        payload: {
          id: 5,
          action: {
            type: 'todo/SET_NAME',
            payload: 'HELLO'
          }
        },
      },
    });
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props).map( attr => {
            return `${attr} ${JSON.stringify(this.props[attr])}`;
          })
        }
      </div>
    );
  }
}

export default connectModule(
  mapState,
  [rootModule],
  MultipleConnected
);
