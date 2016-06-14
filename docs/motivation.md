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

```

```

To create a new state transformation given these folder structures one must create or modify at least `3` files. Additionally these files are 
