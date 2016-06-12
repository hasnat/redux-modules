import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import todoModule from '../modules/todo';
import nestedModel from './nestedModel';

const { array, func, number, shape } = PropTypes;
// TodoList View
const DumbTodoItem = ({id, title, name, checked, actions}) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.setChecked(e.target.checked)
        }
        type='checkbox'
        checked={checked}
      />
    </div>
    <p>
      {`${name}-${checked}`}
    </p>
    <aside>
      <button onClick={() => actions.setName('new one')}>
        Delete Todo
      </button>
    </aside>
  </li>

const TodoItem = nestedModel(todoModule, DumbTodoItem);

export default class TodoList extends React.Component {
  static propTypes = {
    collection: array,
    actions: shape({
      create: func,
      destroy: func,
      update: func,
    }),
  };

  render() {
    const { title, collection = [], actions } = this.props;
    console.log('todolist', collection);

    return (
      <div>
        <h1>{title}</h1>

        <div>
          <label>Description</label>
          <input ref='name'/>

          <input
            type='button'
            value='Create'
            onClick={() => {
              actions.create()
            }}
          />
        </div>

        <ul>
          {collection.map(todo =>
            <TodoItem key={todo.id} {...todo} />
          )}
        </ul>
      </div>
    );
  }
}
