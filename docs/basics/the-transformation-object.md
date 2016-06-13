# The Transformations Array

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

Each of these objects gets turned into an `action creator`, a formatted `constant` prefixed with the module name, and a key in the module's `reducer`.