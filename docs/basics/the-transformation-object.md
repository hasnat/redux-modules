# The Transformation Object

The `transformations` array contains objects which define different state transformations. These objects contain `action`, `middleware`, `payloadTypes`, and `reducer` keys.

`createModule` uses these definitions to generate `action creators`, `constants`, the final reducer, and more.

```js
{
  create: {
    middleware: [
      middlware.propCheck(shape({ description: PropTypes.string }))
    ],
    reducer: (state, { payload }) =>
      state.push(fromJS(payload)),
  }
}
```
> Example transformation object

#Usage
> transformations: { [transformationName]{type*, namespaced*, middleware*, reducer} }

## transformationName
> string

This represents:
- the action creator name: `module.actions.transformationName`
- the constant name: `module.constants.transformationName`
- the default action type: `moduleName/transformationName`

This type can be overridden by using the `type` key.

## type
> string

> optional

The type key can be used to rename the `action type`. Specifying a `type` does _not_ change the name of the generated constants and action creators. The generated constants and action creators are always based on the `transformationName`

## middleware
> [function({ type, payload, meta }) => { type, payload, meta }]

> optional

Middleware is an array of functions that receive `{type, payload, meta}` and return `{type, payload, meta}`. These functions can be used to decorate the action before it's received by the reducer.

## reducer
> function(state, action)
>
> default: state => state
>
> optional

This is the state transformation associated to the `action`.
