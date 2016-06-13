# createModule Output

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

Generates something *roughly* equivalent to the following:

```js
const constants = {
  create: 'todos/CREATE',
  delete: 'todos/DELETE',
};

const actions = {
  create: createAction(constants.create),
  delete: createAction(constants.delete),
};

const reducer = (state = List(), action) => {
  switch (action.type) {
    case constants.create:
      return state.push(fromJS(action.payload));
    case constants.delete:
      return state.delete(action.payload.index);
  }
}
```