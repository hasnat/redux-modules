import React, { PropTypes } from 'react';
import todosModule from '../modules/todos';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  return {
    todos: state.todos.toJS(),
  };
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

  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default connectModule(
  mapState,
  [todosModule],
  MultipleConnected
);
