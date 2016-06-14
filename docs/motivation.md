# Motivation

`redux-modules` was developed to simplify how state transformations are `defined` and how they're `exposed` to the view.

## Making a better state transformation

To create a state transformation we need a few ingredients:
- an action constant
- an action creator
- a reducer function

The following are common folder structures in the Redux community:
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

```
todos/
  components/
    TodoList.jsx
  actions.js
  constants.js
  index.js
  reducer.js
App.jsx
```

To create a new state transformation given these folder structures one must create or modify at least `3` files. Additionally these files are 
