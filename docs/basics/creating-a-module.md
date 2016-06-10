# Creating a Module

The main API used in `redux-modules` is `createModule`. It expects a single parameter: an object with a `name` key, an `initialState`, and an array of `transformations`.

```js
import { createModule } 'redux-modules';

export default createModule({
  name: 'counter',
  initialState: 0,
  transformations: [
    {
      action: 'INCREMENT',
      reducer: state => state + 1,
    },
    {
      action: 'DECREMENT',
      reducer: state => state - 1,
    },
  ],
});
```

The `name` specified is used to prefix the action constants defined in the `transformations` array. The `initialState` is the initial state of the reducer for this piece of the state tree. `transformations` contains an array of `transformation` objects.