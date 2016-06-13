# The Transformation Object

The `transformations` array contains objects which define different state transformations. These objects contain `action`, `middleware`, `payloadTypes`, and `reducer` keys.

```js
{
  action: 'CREATE',
  payloadTypes: {
    description: React.PropTypes.string,
  },
  reducer: (state, { payload }) =>
    state.setIn(['collection', payload.id], fromJS(payload)),
}
```
> Example transformation object

`createModule` uses these definitions to generate `action creators`, `constants`, and the final reducer.