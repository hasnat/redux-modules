import React, { PropTypes } from 'react';
import rootModule from '../modules/root';
import counterModule from '../modules/counter';
import todosModule from '../modules/todos';
import { connectModule } from '../../../src/index';
import DumbTodoList from '../components/TodoList';
import viewModel from '../components/viewModel';
import containerModel from '../components/containerModel';
import { bindActionCreators } from 'redux';
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
          id: "5",
          action: {
            type: 'todo/SET_NAME',
            payload: 'HELLO'
          }
        },
      },
    });
  }


  render() {
    const TodoList = viewModel( todosModule, DumbTodoList );

    const collection = Object.keys(this.props.todos || {}).reduce((arr, key) => arr.concat(this.props.todos[key]), [])
    return (
      <div>
        {
          Object.keys(this.props).map( attr => {
            return `${attr} ${JSON.stringify(this.props[attr])}`;
          })
        }
        <TodoList
          collection={collection}
        />
      </div>
    );
  }
}

export default connectModule(
  mapState,
  [ rootModule ],
  containerModel(rootModule, MultipleConnected)
);
