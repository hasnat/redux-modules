import React, { PropTypes } from 'react';
import todoModule from '../modules/todo';
import counterModule from '../modules/counter';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  return {
    todos: { collection: [... state.todos.toJS()] },
    counter: { count: state.counter },
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
    return (
      <div>
        <TodoList todos={this.props.todos} />
        <button onClick={this.props.counter.actions.increment}>
          +
        </button>
        <h2>Count: {this.props.counter.count}</h2>
        <button onClick={this.props.counter.actions.decrement}>
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
