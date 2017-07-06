# Generated Module

```js
export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: {
    create: {
      payloadTypes: {
        description: PropTypes.string,
      },
      reducer: (state, { payload }) =>
        state.push(fromJS(payload)),
    },
    delete: {
      payloadTypes: {
        index: PropTypes.number
      },
      reducer: (state, { payload: { index } }) =>
        state.delete(index),
    },
  },
});
```


>  This generates something *roughly* equivalent to the following:

```js
const constants = {
  create: 'todos/CREATE',
  delete: 'todos/DELETE',
};

const actions = {
  create(payload, meta) {
    return {
      type: constants.create,
      payload,
      meta,
    };
  },
  delete(payload, meta) {
    return {
      type: constants.delete,
      payload,
      meta,
    };
  },
};

const reducer = (state = List(), action) => {
  switch (action.type) {
    case constants.create:
      return state.push(fromJS(action.payload));
    case constants.delete:
      return state.delete(action.payload.index);
    default:
      return state;
  }
}
```
> This example output does not reflect `payload type checking` or `action middleware`.
