# The Transformation Object

The `transformations` array contains objects which define different state transformations. These objects contain `action`, `middleware`, `payloadTypes`, and `reducer` keys. 

`createModule` uses these definitions to generate `action creators`, `constants`, the final reducer, and more.

```js
{
  action: 'CREATE',
  payloadTypes: {
    description: React.PropTypes.string,
  },
  reducer: (state, { payload }) =>
    state.push(fromJS(payload)),
}
```
> Example transformation object

#Usage
> transformations: [ {action, payloadTypes, middleware, reducer} ]

## action
> string

The name of the action. This is used to create a constant `<moduleName>/<action>`. The generated constant is in turn used in the final reducer.

## payloadTypes
> object

> optional

PropTypes for your actions. Payload types define the payload that we're expecting to call the action creator with. The console will log an error for every key in the payload that fails type validation.

## middleware
> [function({ payload, meta }) => { payload, meta }]

> optional

Middleware is an array of functions that receive {payload, meta} and return {payload, meta}. These functions can be used to decorate the action before it's received by the reducer.

## reducer
> function(state, action)
> 
> default: state => state
> 
> optional

This is the state transformation associated to the `action`.