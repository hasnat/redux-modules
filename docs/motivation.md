# Motivation

`redux-modules` was developed to simplify how state transformations are `defined` and how they're `exposed` to the view.

## Defining state transformations

A state transformation is made up of the following:
- an action constant
- an action creator
- a reducer function

These pieces are often divided into separate files, eg:
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

or combined into the same file, but separated conceptually:

```js
export const CREATE_TODO = 'todos/CREATE';
export const DELETE_TODO = 'todos/DELETE';

export function create(payload, meta) {
  return {
    type: CREATE_TODO,
    payload,
    meta,
  };
}

export function delete(payload, meta) {
  return {
    type: DELETE_TODO,
    payload,
    meta,
  };
}

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
```

To create a new state transformation given these folder structures one must create or modify at least `3` files. Additionally these files are 
