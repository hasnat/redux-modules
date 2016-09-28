# API Reference

- createModule({ name, initialState, composes, transformations })
- transformation object ({ type, namespaced, middleware, reducer })
- connectModule(moduleOrModules)
- connectModule(selector, moduleOrModules)

## `createModule`

### name
> string

Used to prefix the actions defined in the `transformations` array, as well as namespace `actions` when using `connectModule`.

### initialState
> any

The initialState of this reducer of the state tree.

### reducerEnhancer
> function

> optional

Allows use of a `reducerEnhancer` on the module. Examples include `redux-undo` and `redux-ignore`.

### composes
> array of reducer functions with signature (state, action) => newState

> optional

Allows composition of reducers. The action will be run through the current module's reducer first. The newState will then be run through the array of specified functions. Implementation and usage is exactly the same as acdlite's [reduce-reducers](https://github.com/acdlite/reduce-reducers) library.

### transformations
> array

An array of objects that define state transformations.

## `transformation object`

### type
> string

> required

The action type. By default, this constant will be appended to the `name` of the module to create the action constant.

### namespaced
> boolean

> default: true

> optional

Determines whether the module name is combined with the action type.

### middleware
> array of functions with signature (action) => newAction

> optional

Middleware allows the action to be transformed before reaching the reducer function. Example use cases include adding a `uuid` to the action's `payload` or `meta` object, `payload` type checking, or action logging.

### reducer
> function with signature (state, action) => newState

> default: state => state

> optional

State transformation that corresponds to this action.

## `connectModule [ one parameter ]`

### use with a single module
```js
@connectModule(todosModule)
export default class Todos extends Component {
  static propTypes = {
    // results from selector specified in module
    collection: array,
    // actions mapped with dispatch, generated from transformation objects
    actions: shape({
      create: func,
      destroy: func,
    })
  };
}
```
### use with an array of modules
```js
@connectModule([todosModule, userModule])
export default class TodosHomeHandler extends Component {
  static propTypes = {
    todos: shape({
      // results from selector specified in todo module
      collection: array
    }),
    user: shape({
      // results from selector specified in user module
      current: object,
    }),
    actions: shape({
      todos: shape({
        // actions mapped with dispatch, generated from transformation objects
        create: func,
        destroy: func,
      }),
      user: shape({
        logout: func,
      }),
    }),
  };
}
```


## `connectModule [ two parameters ]`

### use with a selector and a single module
```js
@connectModule(selector, todosModule)
export default class Todos extends Component {
  static propTypes = {
    // results from specified selector
    collection: array,
    // actions mapped with dispatch, generated from transformation objects
    actions: shape({
      create: func,
      destroy: func,
    })
  };
}
```
### use with a selector and an array of modules
```js
@connectModule(selector [todosModule, userModule])
export default class TodosHomeHandler extends Component {
  static propTypes = {
    // results from specified selector
    todos: shape({
      collection: array
    }),
    actions: shape({
      todos: shape({
        // actions mapped with dispatch, generated from transformation objects
        create: func,
        destroy: func,
      }),
      user: shape({
        logout: func,
      }),
    }),
  };
}
```
