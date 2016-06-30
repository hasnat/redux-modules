import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';

const { array, func, number, shape } = PropTypes;
// TodoList View
const TodoItem = (actions, {id, title, description, checked}, i) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.update({
            index: i,
            todo: {checked: e.target.checked},
          })
        }
        type='checkbox'
        checked={checked}
      />
    </div>
    <p>
      {description}
    </p>
    <aside>
      <button onClick={() => actions.destroy({index: i})}>
        Delete Todo
      </button>
    </aside>
  </li>

export default class TodoList extends React.Component {
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
    const { title, todos: collection, actions } = this.props;

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
