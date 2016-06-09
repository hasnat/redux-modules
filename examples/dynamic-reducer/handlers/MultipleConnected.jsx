import React, { PropTypes } from 'react';
import todoModule from '../modules/todo';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';
import { List } from 'immutable';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  const { todos = List(), counter = 0} = state;
  return {
    todos: { collection: [ todos.toJS() ] },
    counter: { count: counter },
  }
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
    const { todos, counter } = this.props;
    return (
      <div>
        <TodoList todos={todos} />
        <button onClick={counter.actions.increment}>
          +
        </button>
        <h2>Count: {counter.count}</h2>
        <button onClick={counter.actions.decrement}>
          -
        </button>
      </div>
    );
  }
}

export default connectModule(
  mapState,
  [todoModule, counterModule],
  MultipleConnected
);
