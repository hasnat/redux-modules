# Creating a Module

The main API used in `redux-modules` is `createModule`. It expects a single parameter: an object with a `name` key, an `initialState`, and an array of `transformations`.

```js
import { createModule } 'redux-modules';
import { List } from 'immutable';

export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        description: React.PropTypes.string,
      },
      reducer: (state, { payload }) =>
        state.push(fromJS(payload)),
    }
    {
      action: 'DELETE',
      payloadTypes: {
        index: React.PropTypes.number
      },
      reducer: (state, { payload: { index } }) => 
        state.delete(index),
    },
  ],
});
```

The `name` specified is used to prefix the actions defined in the `transformations` array. The `initialState` is the initial state of the reducer for this piece of the state tree. The `transformations` key contains an array of objects which represent different state transformations.

## name
> string

Used to prefix the actions defined in the `transformations` array, as well as namespace `actions` when using `connectModule`.

## initialState
> any

The initialState of this portion of the state tree.

## transformations
> array

An array of objects that define state transformations.