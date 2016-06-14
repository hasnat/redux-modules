# Motivation

`redux-modules` was developed to simplify how state transformations are **defined** and how they're **exposed** to the view.

## Defining state transformations

A state transformation is made up of the following:
- an action constant
- an action creator
- a reducer function

One strategy is to divide these pieces into separate files:
```
actions/
  todos.js
reducers/
  todos.js
constants/
  todos.js
containers/
  TodoList.jsx
App.jsx
```
In this example, to add a single new action three files must be modified. To create an entirely new set of transformations, three files must be created.

The `redux module` proposition aims to consolidate these pieces into a single file, but they remain conceptually distinct:
```js
// constants
export const CREATE_TODO = 'todos/CREATE';
export const DELETE_TODO = 'todos/DELETE';

// action creators
export function createTodo(payload, meta) {
  return {
    type: CREATE_TODO,
    payload,
    meta,
  };
}

export function deleteTodo(payload, meta) {
  return {
    type: DELETE_TODO,
    payload,
    meta,
  };
}

// reducer
export const reducer = (state = List(), action) => {
  switch (action.type) {
    case CREATE_TODO:
      return state.push(fromJS(action.payload));
    case DELETE_TODO:
      return state.delete(action.payload.index);
    default:
      return state;
  }
}
```

Both of these approaches disconnect the `constant`, the `action creator`, and the accompanying `reducer`. 

Furthermore neither approach scales ideally. The standard Redux route generates 3 files of the same name for every new reducer. The duck/module paradigm grows out of control after about 10 actions, requiring the developer to frantically scroll up and down or open the file in another split.

## A simpler solution
`redux-modules` aims to streamline the process of defining state transformations by combining the `constant`, `action creator`, and `reducer` into a single object.

```js
{
  action: 'CREATE',
  reducer: (state, {payload}) => 
    state.push(fromJS(payload)),
}
```

These transformations as well as additional information, like the action prefix and reducer's initial state are defined in the `module definition` that's fed into `createModule`.
