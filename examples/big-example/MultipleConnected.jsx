import React from 'react';
import todoModule from './todoModule';
import counterModule from './counterModule';
import { connectModule } from '../../src/index';
import TodoList from './TodoList';

const mapState = state => {
  return {
    todos: { collection: [... state.todos.toJS()] },
    counter: { count: state.counter },
  }
};

class MultipleConnected extends React.Component {
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
