# Motivation

`redux-modules` was developed to streamline the process of developing React/Redux based client side applications. 

This project sets out to simplify the following:
- The number of files generated to create a new reducer
- The number of files touched to add a new action
- The fact that behavior must be linked across files via constants

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

or

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

