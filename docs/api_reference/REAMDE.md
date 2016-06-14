# API Reference

- createModule({ name, initialState, transformations })
  - transformation object ({ })
- connectModule(selector, moduleOrModules)

## `createModule`

### name
> string

Used to prefix the actions defined in the `transformations` array, as well as namespace `actions` when using `connectModule`.

### initialState
> any

> default: Map()

> optional

The initialState of this portion of the state tree.

### transformations
> array

An array of objects that define state transformations.

