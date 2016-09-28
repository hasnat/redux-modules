# API Reference

- createModule({ name, initialState, transformations })
  - transformation object ({ })
- connetModule(
- connectModule(selector, moduleOrModules)

## `createModule`

### name
> string

Used to prefix the actions defined in the `transformations` array, as well as namespace `actions` when using `connectModule`.

### initialState
> any

The initialState of this portion of the state tree.

### reducerEnhancer
> function

> optional

Allows use of a `reducerEnhancer` on the module. Examples include `redux-undo` and `redux-ignore`.

### composes
> array of functions

> optional

Allows for composition of reducers. Actions will first run through the current module's reducer, and then through this array of reducers in order. The implementation is similar to acdlite's [reduce-reducers](https://github.com/acdlite/reduce-reducers) library.

### transformations
> array

An array of objects that define state transformations.


## connectModule
