# Motivation

`redux-modules` was developed to simplify how state transformations are **defined** and how they're **exposed** to the view.

## Defining state transformations

A state transformation is made up of an action constant, an action creator, and a reducer function. The Redux community has come up with two strategies for organizing these pieces.

The first strategy is to divide these pieces into separate files:
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
> At least 4 files must be created/modified to support a new state transformation

The second strategy is to combine these pieces into a single file:
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
> Readability drops as the number of actions increases

Both of these approaches disconnect the `constant`, the `action creator`, and the accompanying `reducer`. Neither approach scales well as new transformations are created. The first option generates 3 files of the same name for every new reducer while second grows out of control after about 10 actions.

## A simpler solution
`redux-modules` aims to streamline the process of defining state transformations by combining the `constant`  and `reducer` into a single object. `createModules` then uses these objects to generate `action creators` for each state transformations.

```js
{
  action: 'CREATE',
  payloadTypes: { decription: string.isRequired },
  reducer: (state, {payload}) => 
    state.push(fromJS(payload)),
}
```
By colocating these concerns, adding a new state transformation is as easy as adding a new object to an array. Additionally, by generating `action creators` dynamically we're able to inject middleware behavior such as `payload typechecking`.
