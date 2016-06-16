import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import todoModule from '../modules/todo';
import { connectModule } from '../../../src/index';
import Counter from './Counter';

const { array, func, number, shape } = PropTypes;

const mapState = state => {
  return {
    todos: { collection: [... state.todos.toJS()] },
  }
};

const TodoItem = (actions, {title, description, checked, count = 0}, i) =>
  <li>
    <div className="checkbox">
      <Counter id={i} count={count}/>
    </div>
    <p>
      {`${description}-${count}`}
    </p>
    <aside>
      <button onClick={() => actions.destroy({index: i})}>
        Delete Todo
      </button>
    </aside>
  </li>

class TodoList extends React.Component {
  static propTypes = {
    todos: shape({
      collection: array,
      actions: shape({
        create: func,
        destroy: func,
        update: func,
      }),
    }),
  };

  render() {
    const { title, todos: todoProps } = this.props;
    const { collection = [], actions } = todoProps;

    return (
      <div>
        <h1>{title}</h1>

        <div>
          <label>Description</label>
          <input ref='description'/>

          <input
            type='button'
            value='Create'
            onClick={() => {
              actions.create({
                todo: {
                  description: findDOMNode(this.refs.description).value,
                }
              })
            }}
          />
        </div>

        <ul>
          {collection.map(TodoItem.bind(null, actions))}
        </ul>
      </div>
    );
  }
}

export default connectModule(mapState, todoModule, TodoList);
