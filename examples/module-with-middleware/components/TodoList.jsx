import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';

const { array, func, number, shape } = PropTypes;
// TodoList View
const TodoItem = ({id, title, description, checked, actions}) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.update({
            index,
            todo: {checked: e.target.checked},
          })
        }
        type='checkbox'
        checked={checked}
      />
    </div>
    <p>
      {`${id}-${description}`}
    </p>
    <aside>
      <button onClick={() => actions.destroy({index})}>
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
    const { title, todos: todoProps } = this.props;
    const { collection = [], actions } = todoProps ;

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
          {collection.map((item, i) =>
            <TodoItem { ... item}
              key={i}
              index={i}
              actions={actions}
            />
          )}
        </ul>
      </div>
    );
  }
}
