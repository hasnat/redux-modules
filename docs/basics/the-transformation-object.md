# The Transformation Object

The `transformation` object serves as the definition of a state transformation. It is comprised of `action`, `middleware`, `payloadTypes`, and `reducer` keys.

```js
{
  action: 'CREATE',
  payloadTypes: {
  
  },
  reducer: (state, { payload }) =>
    state.setIn(['collection', payload.id], fromJS(payload)),
}
```

