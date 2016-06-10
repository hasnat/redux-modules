# The Transformation Object

The `transformation` object serves as the definition of a state transformation. The object contains `action`, `middleware`, `payloadTypes`, and `reducer` keys.

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

Each of these objects gets turned into an `action creator`, a formatted `constant` prefixed with the module name, and a key in the module's `reducer`.