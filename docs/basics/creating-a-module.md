# Creating a Module

The main API used in `redux-modules` is `createModule`. It expects a single parameter: an object with a `name` key, an `initialState`, and an array of `transformations`.

```js
import { createModule, middleware } 'redux-modules';
import { List } from 'immutable';

export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: {
    create: {
      middleware: [
        middlware.propCheck(shape({ description: PropTypes.string }))
      ],
      reducer: (state, { payload }) =>
        state.push(fromJS(payload)),
    },
    delete: {
      middleware: [
        middlware.propCheck(PropTypes.number)
      ],
      reducer: (state, { payload }) =>
        state.delete(payload),
    },
  ],
});
```

The `name` specified is used to determine which slice of the state tree the generated reducer operates on, and to prefix the actions defined in the `transformations` array.

The `initialState` is the initial state of the reducer for this piece of the state tree.

The key/value paris in the `transformations` object represent each state transformation.
