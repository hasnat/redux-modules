# redux-modules [![Circle CI](https://circleci.com/gh/mboperator/redux-modules/tree/master.svg?style=svg)](https://circleci.com/gh/mboperator/redux-modules/tree/master)

`redux-modules` is a refinement on the [Redux module](https://github.com/erikras/ducks-modular-redux) concept with developer experience in mind. It provides:
- an **intuitive** way define actions and state transformations
- **propType style typechecking** for action payloads
![Example](https://raw.githubusercontent.com/mboperator/redux-modules/master/examples/screenshots/payloadTypes.png "redux-modules")
- a decorator for passing bound module actions to React views

## Getting Started
### Install
`npm install redux-modules --save`

### Usage Example
Here's an example of a simple todo app. It can create todos and destroy them.

#### src/modules/todos.js
```js
export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      reducer: (state, {payload: { todo }}) =>
        state.update('collection', todos => todos.push(fromJS(todo))),
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        state.update('collection', todos => todos.delete(index)),
    },
  ],
});
```

Now we add the reducer to our store
#### src/App.jsx
```js
const store = createStore(todoModule.reducer, List());

export default const App = props => (
  <Provider store={store}>
    <Todos {...props}/>
  </Provider>
)
```

The last step is to wire it up to the view

#### src/views/Todos.jsx
```js
const selector = state => {
  return {
    todos: {
      collection: state.get('todos').toJS(),
    }
  };
};

@connectModule(selector, todoModule)
export default class Todos extends Component {
  static propTypes = {
    todos: shape({
      // exposed by selector
      collection: array,
      // actions from module w/ bound dispatch
      actions: shape({
        create: func,
        destroy: func,
      }),
    }),
  };
```

That's it!

# Documentation

### createModule({ name, initialState, transformations })
```js
const { actions, reducer, constants } = createModule({
  name: 'users',
  initialState: {},
  transformations: [ /* array of transformation objects */ ],
});
```
### parameters:
- name (_string_): Name of module, used to prefix action types.
- transformations (_array_): Array of `transformation` objects.
- initialState (_any_): Initial store state. Defaults to immutable Map if undefined

### Transformation Object
```js
{
  action: 'CREATE_TODO',
  payloadTypes: {
    todo: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
  },
  reducer: (state, {todo}) => state.set(todo.id, todo),
},
```
#### Attributes:
- action (_string_): Action constant
- payloadTypes (_object_): Like React PropTypes, but for your action payload.
- reducer (_function(state, action)_): State transformation that corresponds to the action

## connectModule(selector, module, Component)
```js
@connectModule(state => state.get('todos').toJS(), todoModule)
```
### Parameters
- selector _(function)_: A function that receives state, props, and returns an object
- module _(object)_: A redux module object
- Component _(function or class)_: A React Component
