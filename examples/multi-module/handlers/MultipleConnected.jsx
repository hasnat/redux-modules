import React, { PropTypes } from 'react';
import todoModule from '../modules/todo';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';
import { List } from 'immutable';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  const { todos = List(), counter = 0 } = state;
  return {
    todoCollection: todos.toJS(),
    counter,
  };
};

@connectModule(mapState, [todoModule, counterModule])
export default class MultipleConnected extends React.Component {
  static propTypes = {
    todoCollection: array,
    counter: number,
    actions: shape({
      counter: shape({
        increment: func,
        decrement: func,
      }),
      todos: shape({
        create: func,
        destroy: func,
        update: func,
      }),
    }),
  };

  render() {
    const { todoCollection, counter, actions } = this.props;
    return (
      <div>
        <TodoList todos={todoCollection} actions={actions.todos} />
        <button onClick={actions.counter.increment}>
          +
        </button>
        <h2>Count: {counter}</h2>
        <button onClick={actions.counter.decrement}>
          -
        </button>
      </div>
    );
  }
}

